import type { CheckIn, NodeProgress, ProgressMap, ProgressStatus } from '../data/types'

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
  }
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
  return write(map, id, {
    status,
    notes: notes ?? map[id]?.notes ?? '',
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
  return write(map, id, {
    status: current.status === 'none' ? 'in_progress' : current.status,
    resourcesDone: has
      ? current.resourcesDone.filter((item) => item !== resourceId)
      : [...current.resourcesDone, resourceId],
  })
}

export function toggleSubtopic(map: ProgressMap, id: string, subtopicId: string): ProgressMap {
  const current = emptyNode(map[id])
  const has = current.subtopicsDone.includes(subtopicId)
  return write(map, id, {
    status: current.status === 'none' ? 'in_progress' : current.status,
    subtopicsDone: has
      ? current.subtopicsDone.filter((item) => item !== subtopicId)
      : [...current.subtopicsDone, subtopicId],
  })
}

export function isSubtopicDone(map: ProgressMap, id: string, subtopicId: string): boolean {
  return (map[id]?.subtopicsDone ?? []).includes(subtopicId)
}

export function toggleIdea(map: ProgressMap, id: string, index: number): ProgressMap {
  const current = emptyNode(map[id])
  const has = current.ideasDone.includes(index)
  return write(map, id, {
    status: current.status === 'none' ? 'in_progress' : current.status,
    ideasDone: has
      ? current.ideasDone.filter((item) => item !== index)
      : [...current.ideasDone, index],
  })
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
