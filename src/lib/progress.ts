import type {
  ActivityEvent,
  ActivityKind,
  CheckIn,
  NodeProgress,
  ProgressMap,
  ProgressStatus,
} from '../data/types'
import { topicById } from '../data'
import { subtopicsFor } from '../data/curriculum'
import { resourcesById } from '../data/resources'
import { toDateInput } from './dates'

const KEY = 'mathdag-progress-v1'

export function emptyNode(partial: Partial<NodeProgress> = {}): NodeProgress {
  return {
    status: partial.status ?? 'none',
    notes: partial.notes ?? '',
    updatedAt: partial.updatedAt ?? new Date().toISOString(),
    checkins: Array.isArray(partial.checkins) ? partial.checkins : [],
    resourcesDone: Array.isArray(partial.resourcesDone) ? partial.resourcesDone : [],
    ideasDone: Array.isArray(partial.ideasDone) ? partial.ideasDone : [],
    subtopicsDone: Array.isArray(partial.subtopicsDone) ? partial.subtopicsDone : [],
    events: Array.isArray(partial.events) ? partial.events : [],
    tracked:
      partial.tracked && typeof partial.tracked === 'object' && !Array.isArray(partial.tracked)
        ? partial.tracked
        : {},
  }
}

function newId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

function pushEvent(
  events: ActivityEvent[],
  kind: ActivityKind,
  ref: string,
  label: string,
): ActivityEvent[] {
  return [{ id: newId(), at: new Date().toISOString(), kind, ref, label }, ...events]
}

/** Remove the most recent event matching kind+ref (used when something is un-ticked). */
function popEvent(events: ActivityEvent[], kind: ActivityKind, ref: string): ActivityEvent[] {
  const index = events.findIndex((event) => event.kind === kind && event.ref === ref)
  if (index < 0) return events
  return [...events.slice(0, index), ...events.slice(index + 1)]
}

function empty(): ProgressMap {
  return {}
}

export function loadProgress(): ProgressMap {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return empty()
    const parsed = JSON.parse(raw) as ProgressMap
    if (!parsed || typeof parsed !== 'object') return empty()
    const next: ProgressMap = {}
    for (const [id, value] of Object.entries(parsed)) {
      next[id] = emptyNode(value ?? {})
    }
    return next
  } catch {
    return empty()
  }
}

export function saveProgress(map: ProgressMap) {
  localStorage.setItem(KEY, JSON.stringify(map))
}

function write(map: ProgressMap, id: string, patch: Partial<NodeProgress>): ProgressMap {
  const next: ProgressMap = {
    ...map,
    [id]: emptyNode({
      ...map[id],
      ...patch,
      updatedAt: new Date().toISOString(),
    }),
  }
  saveProgress(next)
  return next
}

export function setStatus(
  map: ProgressMap,
  id: string,
  status: ProgressStatus,
  notes?: string,
): ProgressMap {
  const current = emptyNode(map[id])
  const wasDone = current.status === 'completed' || current.status === 'known'
  const willBeDone = status === 'completed' || status === 'known'
  let events = current.events
  if (willBeDone && !wasDone) {
    events = pushEvent(
      events,
      'mastered',
      id,
      status === 'known' ? 'Marked as already known' : 'Checked off the subject',
    )
  } else if (!willBeDone && wasDone) {
    events = popEvent(events, 'mastered', id)
  }
  return write(map, id, {
    status,
    notes: notes ?? current.notes,
    events,
  })
}

export function toggleDone(map: ProgressMap, id: string): ProgressMap {
  const current = map[id]?.status ?? 'none'
  const next: ProgressStatus =
    current === 'completed' || current === 'known' ? 'none' : 'completed'
  return setStatus(map, id, next)
}

export function setNotes(map: ProgressMap, id: string, notes: string): ProgressMap {
  return write(map, id, { notes, status: map[id]?.status ?? 'none' })
}

export function addCheckIn(
  map: ProgressMap,
  id: string,
  input: { minutes: number; note: string; at?: string },
): ProgressMap {
  const current = emptyNode(map[id])
  const checkin: CheckIn = {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    at: input.at ?? new Date().toISOString(),
    minutes: Math.max(0, Math.round(input.minutes)),
    note: input.note.trim(),
  }
  const status: ProgressStatus =
    current.status === 'none' ? 'in_progress' : current.status
  return write(map, id, {
    status,
    checkins: [checkin, ...current.checkins],
  })
}

export function removeCheckIn(map: ProgressMap, id: string, checkInId: string): ProgressMap {
  const current = emptyNode(map[id])
  return write(map, id, {
    status: current.status,
    checkins: current.checkins.filter((item) => item.id !== checkInId),
  })
}

export function toggleResource(map: ProgressMap, id: string, resourceId: string): ProgressMap {
  const current = emptyNode(map[id])
  const has = current.resourcesDone.includes(resourceId)
  const label = resourcesById[resourceId]?.title ?? resourceId
  return write(map, id, {
    status: current.status === 'none' ? 'in_progress' : current.status,
    resourcesDone: has
      ? current.resourcesDone.filter((item) => item !== resourceId)
      : [...current.resourcesDone, resourceId],
    events: has
      ? popEvent(current.events, 'resource', resourceId)
      : pushEvent(current.events, 'resource', resourceId, label),
  })
}

export function toggleSubtopic(map: ProgressMap, id: string, subtopicId: string): ProgressMap {
  const current = emptyNode(map[id])
  const has = current.subtopicsDone.includes(subtopicId)
  const label = subtopicsFor(id).find((item) => item.id === subtopicId)?.title ?? subtopicId
  return write(map, id, {
    status: current.status === 'none' ? 'in_progress' : current.status,
    subtopicsDone: has
      ? current.subtopicsDone.filter((item) => item !== subtopicId)
      : [...current.subtopicsDone, subtopicId],
    events: has
      ? popEvent(current.events, 'subtopic', subtopicId)
      : pushEvent(current.events, 'subtopic', subtopicId, label),
  })
}

export function isSubtopicDone(map: ProgressMap, id: string, subtopicId: string): boolean {
  return (map[id]?.subtopicsDone ?? []).includes(subtopicId)
}

export function toggleIdea(map: ProgressMap, id: string, index: number): ProgressMap {
  const current = emptyNode(map[id])
  const has = current.ideasDone.includes(index)
  const ref = String(index)
  const label = topicById[id]?.ideas[index] ?? `Idea ${index + 1}`
  return write(map, id, {
    status: current.status === 'none' ? 'in_progress' : current.status,
    ideasDone: has
      ? current.ideasDone.filter((item) => item !== index)
      : [...current.ideasDone, index],
    events: has
      ? popEvent(current.events, 'idea', ref)
      : pushEvent(current.events, 'idea', ref, label),
  })
}

/**
 * Record that material was opened in the viewer. One event per resource per day keeps the
 * feed readable; the subject moves to in progress the first time anything is opened.
 */
export function recordView(map: ProgressMap, id: string, resourceId: string): ProgressMap {
  const current = emptyNode(map[id])
  const today = toDateInput()
  const already = current.events.some(
    (event) => event.kind === 'view' && event.ref === resourceId && toDateInput(event.at) === today,
  )
  if (already && current.status !== 'none') return map
  const label = resourcesById[resourceId]?.title ?? resourceId
  return write(map, id, {
    status: current.status === 'none' ? 'in_progress' : current.status,
    events: already ? current.events : pushEvent(current.events, 'view', resourceId, label),
  })
}

/** Add automatically tracked study minutes for today (called by the viewer clock). */
export function addTrackedMinutes(map: ProgressMap, id: string, minutes: number): ProgressMap {
  if (minutes <= 0) return map
  const current = emptyNode(map[id])
  const day = toDateInput()
  return write(map, id, {
    status: current.status,
    tracked: { ...current.tracked, [day]: (current.tracked[day] ?? 0) + minutes },
  })
}

export function trackedMinutes(map: ProgressMap, id: string): number {
  return Object.values(map[id]?.tracked ?? {}).reduce((sum, value) => sum + value, 0)
}

export type FlatEvent = ActivityEvent & { nodeId: string }

/** Every automatic event across subjects, newest first. */
export function allEvents(map: ProgressMap): FlatEvent[] {
  const out: FlatEvent[] = []
  for (const [nodeId, node] of Object.entries(map)) {
    for (const event of node.events ?? []) out.push({ ...event, nodeId })
  }
  return out.sort((a, b) => Date.parse(b.at) - Date.parse(a.at))
}

export function isDone(map: ProgressMap, id: string): boolean {
  const status = map[id]?.status
  return status === 'completed' || status === 'known'
}

export function minutesOn(map: ProgressMap, id: string): number {
  return (map[id]?.checkins ?? []).reduce((sum, item) => sum + item.minutes, 0)
}

export function lastCheckIn(map: ProgressMap, id: string): CheckIn | null {
  const list = map[id]?.checkins ?? []
  if (list.length === 0) return null
  return [...list].sort((a, b) => Date.parse(b.at) - Date.parse(a.at))[0]
}

export type FlatCheckIn = CheckIn & { nodeId: string }

export function allCheckIns(map: ProgressMap): FlatCheckIn[] {
  const out: FlatCheckIn[] = []
  for (const [nodeId, node] of Object.entries(map)) {
    for (const checkin of node.checkins ?? []) {
      out.push({ ...checkin, nodeId })
    }
  }
  return out.sort((a, b) => Date.parse(b.at) - Date.parse(a.at))
}

export function minutesSince(map: ProgressMap, sinceMs: number): number {
  return allCheckIns(map)
    .filter((item) => Date.parse(item.at) >= sinceMs)
    .reduce((sum, item) => sum + item.minutes, 0)
}

export function exportProgress(map: ProgressMap): string {
  return JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      progress: map,
    },
    null,
    2,
  )
}

export function importProgress(json: string): ProgressMap {
  const parsed = JSON.parse(json) as { progress?: ProgressMap } & ProgressMap
  const raw = parsed.progress ?? parsed
  if (!raw || typeof raw !== 'object') throw new Error('Invalid progress file')
  const map: ProgressMap = {}
  for (const [id, value] of Object.entries(raw)) {
    if (id === 'exportedAt') continue
    map[id] = emptyNode(value ?? {})
  }
  saveProgress(map)
  return map
}
