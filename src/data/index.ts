import type { Domain, Topic } from './types'
import { mathTopics } from './nodes-math'
import { computingTopics } from './nodes-computing'
import { physicsTopics } from './nodes-physics'
import { neuroTopics } from './nodes-neuro'
import { aiTopics } from './nodes-ai'
import { bridgeTopics } from './nodes-bridge'

export const topics: Topic[] = [
  ...mathTopics,
  ...computingTopics,
  ...physicsTopics,
  ...neuroTopics,
  ...aiTopics,
  ...bridgeTopics,
]

export const topicById: Record<string, Topic> = Object.fromEntries(
  topics.map((topic) => [topic.id, topic]),
)

export const unlocksById: Record<string, string[]> = {}
for (const topic of topics) {
  for (const pre of topic.prerequisites) {
    if (!unlocksById[pre]) unlocksById[pre] = []
    unlocksById[pre].push(topic.id)
  }
}

export function assertGraph(): string[] {
  const errors: string[] = []
  const visiting = new Set<string>()
  const visited = new Set<string>()

  for (const topic of topics) {
    for (const pre of topic.prerequisites) {
      if (!topicById[pre]) {
        errors.push(`${topic.id} lists missing prerequisite ${pre}`)
      }
    }
  }

  function walk(id: string, stack: string[]) {
    if (visited.has(id)) return
    if (visiting.has(id)) {
      errors.push(`cycle: ${[...stack, id].join(' → ')}`)
      return
    }
    visiting.add(id)
    for (const pre of topicById[id]?.prerequisites ?? []) {
      if (topicById[pre]) walk(pre, [...stack, id])
    }
    visiting.delete(id)
    visited.add(id)
  }

  for (const topic of topics) walk(topic.id, [])
  return errors
}

export function rankOf(id: string, memo = new Map<string, number>()): number {
  const cached = memo.get(id)
  if (cached != null) return cached
  const topic = topicById[id]
  if (!topic || topic.prerequisites.length === 0) {
    memo.set(id, 0)
    return 0
  }
  const rank = 1 + Math.max(...topic.prerequisites.map((pre) => rankOf(pre, memo)))
  memo.set(id, rank)
  return rank
}

export const maxRank = Math.max(...topics.map((topic) => rankOf(topic.id)))

export function hoursFor(ids: string[]): number {
  return ids.reduce((sum, id) => sum + (topicById[id]?.hours ?? 0), 0)
}

export function topicsInDomain(domain: Domain): Topic[] {
  return topics.filter((topic) => topic.domains.includes(domain))
}
