import { topicById } from '../data'
import { subtopicsFor } from '../data/curriculum'
import { resourcesByNode } from '../data/resources'
import type { ProgressMap, Topic } from '../data/types'
import { toDateInput } from './dates'
import { allCheckIns, allEvents, emptyNode, isDone } from './progress'

/**
 * Mastery is computed continuously from what you tick — nothing has to be declared.
 *
 *   none        nothing opened or ticked
 *   attempted   something opened, checked in, or a first item ticked
 *   familiar    roughly a third of the material ticked
 *   proficient  most of the material ticked
 *   mastered    you checked the subject off (or marked it already known)
 */
export type MasteryLevel = 'none' | 'attempted' | 'familiar' | 'proficient' | 'mastered'

export const MASTERY_LEVELS: MasteryLevel[] = ['none', 'attempted', 'familiar', 'proficient', 'mastered']

export const MASTERY_LABEL: Record<MasteryLevel, string> = {
  none: 'Not started',
  attempted: 'Attempted',
  familiar: 'Familiar',
  proficient: 'Proficient',
  mastered: 'Mastered',
}

export interface Part {
  done: number
  total: number
}

export interface Mastery {
  level: MasteryLevel
  /** 0–100. Reaches 100 only when the subject is checked off. */
  pct: number
  subtopics: Part
  ideas: Part
  resources: Part
  /** Check-in minutes plus automatically tracked viewer minutes. */
  minutes: number
  checkins: number
  /** ISO time of the most recent activity of any kind, or null. */
  lastActive: string | null
}

const WEIGHTS = { subtopics: 3, ideas: 2, resources: 1 }

export function masteryOf(progress: ProgressMap, topicId: string): Mastery {
  const topic = topicById[topicId]
  const node = emptyNode(progress[topicId])
  const subtopics: Part = {
    total: subtopicsFor(topicId).length,
    done: node.subtopicsDone.length,
  }
  const ideas: Part = { total: topic?.ideas.length ?? 0, done: node.ideasDone.length }
  const resources: Part = {
    total: resourcesByNode[topicId]?.length ?? 0,
    done: node.resourcesDone.length,
  }
  const checkinMinutes = node.checkins.reduce((sum, item) => sum + item.minutes, 0)
  const trackedMinutes = Object.values(node.tracked).reduce((sum, value) => sum + value, 0)
  const minutes = checkinMinutes + trackedMinutes

  const times = [
    ...node.checkins.map((item) => item.at),
    ...node.events.map((item) => item.at),
    ...Object.keys(node.tracked).map((day) => `${day}T12:00:00`),
  ]
    .map((iso) => Date.parse(iso))
    .filter((ms) => !Number.isNaN(ms))
  const lastActive = times.length ? new Date(Math.max(...times)).toISOString() : null

  if (isDone(progress, topicId)) {
    return { level: 'mastered', pct: 100, subtopics, ideas, resources, minutes, checkins: node.checkins.length, lastActive }
  }

  let weight = 0
  let score = 0
  for (const [key, part] of [
    ['subtopics', subtopics],
    ['ideas', ideas],
    ['resources', resources],
  ] as const) {
    if (part.total === 0) continue
    weight += WEIGHTS[key]
    score += WEIGHTS[key] * Math.min(1, part.done / part.total)
  }
  const fraction = weight > 0 ? score / weight : 0
  const touched =
    fraction > 0 || node.checkins.length > 0 || node.events.length > 0 || minutes > 0 || node.status === 'in_progress'

  // Cap below 100 so the bar only fills completely when you check the subject off.
  const pct = touched ? Math.max(3, Math.min(96, Math.round(fraction * 96))) : 0

  let level: MasteryLevel = 'none'
  if (touched) level = 'attempted'
  if (fraction >= 0.34) level = 'familiar'
  if (fraction >= 0.75) level = 'proficient'

  return { level, pct, subtopics, ideas, resources, minutes, checkins: node.checkins.length, lastActive }
}

/** Hour-weighted mastery across a set of subjects, 0–100, plus counts per level. */
export function summarize(progress: ProgressMap, topics: Topic[]) {
  let hours = 0
  let earned = 0
  const counts: Record<MasteryLevel, number> = {
    none: 0,
    attempted: 0,
    familiar: 0,
    proficient: 0,
    mastered: 0,
  }
  const hoursByLevel: Record<MasteryLevel, number> = { ...counts }
  for (const topic of topics) {
    const m = masteryOf(progress, topic.id)
    hours += topic.hours
    earned += (topic.hours * m.pct) / 100
    counts[m.level] += 1
    hoursByLevel[m.level] += topic.hours
  }
  return {
    pct: hours > 0 ? Math.round((earned / hours) * 100) : 0,
    hours,
    earnedHours: Math.round(earned),
    counts,
    hoursByLevel,
    total: topics.length,
  }
}

/** First unchecked item in a subject: the natural "continue here" pointer. */
export function nextItem(progress: ProgressMap, topicId: string): string | null {
  const node = emptyNode(progress[topicId])
  const topic = topicById[topicId]
  const sub = subtopicsFor(topicId).find((item) => !node.subtopicsDone.includes(item.id))
  if (sub) return sub.title
  const ideaIndex = topic?.ideas.findIndex((_, index) => !node.ideasDone.includes(index)) ?? -1
  if (ideaIndex >= 0 && topic) return topic.ideas[ideaIndex]
  const resource = (resourcesByNode[topicId] ?? []).find((item) => !node.resourcesDone.includes(item.id))
  if (resource) return `Use: ${resource.title}`
  return null
}

// ---- Days, streaks, and the activity calendar ---------------------------------------------

export interface DayStat {
  day: string
  minutes: number
  marks: number
}

/** Minutes and ticks per local day across every subject. */
export function dayStats(progress: ProgressMap): Map<string, DayStat> {
  const map = new Map<string, DayStat>()
  const bump = (day: string, minutes: number, marks: number) => {
    const current = map.get(day) ?? { day, minutes: 0, marks: 0 }
    current.minutes += minutes
    current.marks += marks
    map.set(day, current)
  }
  for (const item of allCheckIns(progress)) bump(toDateInput(item.at), item.minutes, 0)
  for (const event of allEvents(progress)) {
    if (event.kind !== 'view') bump(toDateInput(event.at), 0, 1)
  }
  for (const node of Object.values(progress)) {
    for (const [day, minutes] of Object.entries(node.tracked ?? {})) bump(day, minutes, 0)
  }
  return map
}

function shiftDay(day: string, delta: number): string {
  const date = new Date(`${day}T12:00:00`)
  date.setDate(date.getDate() + delta)
  return toDateInput(date.toISOString())
}

export function isActiveDay(stat: DayStat | undefined): boolean {
  return Boolean(stat && (stat.minutes > 0 || stat.marks > 0))
}

/** Current streak (today or yesterday keeps it alive) and the longest ever. */
export function streaks(stats: Map<string, DayStat>): { current: number; longest: number } {
  const today = toDateInput()
  let cursor = isActiveDay(stats.get(today)) ? today : shiftDay(today, -1)
  let current = 0
  while (isActiveDay(stats.get(cursor))) {
    current += 1
    cursor = shiftDay(cursor, -1)
  }

  const days = [...stats.values()].filter(isActiveDay).map((s) => s.day).sort()
  let longest = 0
  let run = 0
  let previous: string | null = null
  for (const day of days) {
    run = previous && shiftDay(previous, 1) === day ? run + 1 : 1
    longest = Math.max(longest, run)
    previous = day
  }
  return { current, longest: Math.max(longest, current) }
}

/** Minutes and marks over the trailing N days including today. */
export function trailing(stats: Map<string, DayStat>, days: number): { minutes: number; marks: number; activeDays: number } {
  const today = toDateInput()
  let minutes = 0
  let marks = 0
  let activeDays = 0
  for (let i = 0; i < days; i += 1) {
    const stat = stats.get(shiftDay(today, -i))
    if (!stat) continue
    minutes += stat.minutes
    marks += stat.marks
    if (isActiveDay(stat)) activeDays += 1
  }
  return { minutes, marks, activeDays }
}

/** Week columns (oldest first) of day keys, ending with the current week, Monday-first. */
export function calendarWeeks(weeks: number): string[][] {
  const today = new Date()
  today.setHours(12, 0, 0, 0)
  const dow = (today.getDay() + 6) % 7 // Monday = 0
  const end = new Date(today)
  end.setDate(today.getDate() + (6 - dow))
  const out: string[][] = []
  for (let w = weeks - 1; w >= 0; w -= 1) {
    const column: string[] = []
    for (let d = 0; d < 7; d += 1) {
      const date = new Date(end)
      date.setDate(end.getDate() - w * 7 - (6 - d))
      column.push(toDateInput(date.toISOString()))
    }
    out.push(column)
  }
  return out
}

// ---- Weekly goal -----------------------------------------------------------------------------

const GOAL_KEY = 'mathdag-goal-v1'
export const DEFAULT_GOAL_MINUTES = 300

export function loadGoal(): number {
  try {
    const raw = Number(localStorage.getItem(GOAL_KEY))
    return Number.isFinite(raw) && raw > 0 ? raw : DEFAULT_GOAL_MINUTES
  } catch {
    return DEFAULT_GOAL_MINUTES
  }
}

export function saveGoal(minutes: number) {
  localStorage.setItem(GOAL_KEY, String(Math.max(15, Math.round(minutes))))
}
