import { topicById, unlocksById } from '../data'
import type { ProgressMap } from '../data/types'
import { isDone } from './progress'

export function prerequisitesMet(id: string, progress: ProgressMap): boolean {
  const topic = topicById[id]
  if (!topic) return false
  return topic.prerequisites.every((pre) => isDone(progress, pre))
}

export function availability(
  id: string,
  progress: ProgressMap,
): 'done' | 'in_progress' | 'available' | 'locked' {
  const status = progress[id]?.status ?? 'none'
  if (status === 'completed' || status === 'known') return 'done'
  if (status === 'in_progress') return 'in_progress'
  return prerequisitesMet(id, progress) ? 'available' : 'locked'
}

export function frontier(progress: ProgressMap): string[] {
  return Object.keys(topicById).filter((id) => availability(id, progress) === 'available')
}

export function unlockedBy(id: string): string[] {
  return unlocksById[id] ?? []
}

export function ancestorSet(id: string): Set<string> {
  const out = new Set<string>()
  const stack = [...(topicById[id]?.prerequisites ?? [])]
  while (stack.length) {
    const cur = stack.pop()!
    if (out.has(cur)) continue
    out.add(cur)
    for (const pre of topicById[cur]?.prerequisites ?? []) stack.push(pre)
  }
  return out
}

export function descendantSet(id: string): Set<string> {
  const out = new Set<string>()
  const stack = [...(unlocksById[id] ?? [])]
  while (stack.length) {
    const cur = stack.pop()!
    if (out.has(cur)) continue
    out.add(cur)
    for (const next of unlocksById[cur] ?? []) stack.push(next)
  }
  return out
}
