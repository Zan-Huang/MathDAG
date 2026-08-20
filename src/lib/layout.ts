import { rankOf } from '../data'
import type { Domain, Topic } from '../data/types'

export const DOMAIN_ORDER: Domain[] = [
  'math',
  'computing',
  'physics',
  'biology',
  'compneuro',
  'ai',
  'bridge',
]

export const NODE_W = 188
export const NODE_H = 52
export const COL_W = 236
export const ROW_H = 68
export const PAD_X = 56
export const PAD_Y = 48

export type Positioned = {
  topic: Topic
  x: number
  y: number
  rank: number
}

export function layoutTopics(visible: Topic[]): {
  nodes: Positioned[]
  width: number
  height: number
} {
  const ranks = new Map<number, Topic[]>()
  for (const topic of visible) {
    const rank = rankOf(topic.id)
    const list = ranks.get(rank) ?? []
    list.push(topic)
    ranks.set(rank, list)
  }

  for (const list of ranks.values()) {
    list.sort((a, b) => {
      const da = DOMAIN_ORDER.indexOf(a.primary)
      const db = DOMAIN_ORDER.indexOf(b.primary)
      if (da !== db) return da - db
      return a.title.localeCompare(b.title)
    })
  }

  const nodes: Positioned[] = []
  let maxY = 0
  let maxRank = 0
  for (const [rank, list] of ranks) {
    maxRank = Math.max(maxRank, rank)
    list.forEach((topic, i) => {
      const x = PAD_X + rank * COL_W
      const y = PAD_Y + i * ROW_H
      nodes.push({ topic, x, y, rank })
      maxY = Math.max(maxY, y + NODE_H)
    })
  }

  return {
    nodes,
    width: PAD_X * 2 + (maxRank + 1) * COL_W,
    height: maxY + PAD_Y,
  }
}

export function edgePath(
  from: Positioned,
  to: Positioned,
): string {
  const x1 = from.x + NODE_W
  const y1 = from.y + NODE_H / 2
  const x2 = to.x
  const y2 = to.y + NODE_H / 2
  const dx = Math.max(40, (x2 - x1) * 0.45)
  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`
}