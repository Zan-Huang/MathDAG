import { paths } from '../data/paths'
import { topicById, topics } from '../data'
import { DOMAIN_LABEL, DOMAINS, type Domain, type Topic } from '../data/types'

const KEY = 'mathdag-focus-v1'

export type Focus =
  | { type: 'all' }
  | { type: 'path'; id: string }
  | { type: 'domain'; id: Domain }

export function focusKey(focus: Focus): string {
  if (focus.type === 'all') return 'all'
  return `${focus.type}:${focus.id}`
}

export function parseFocusKey(value: string): Focus {
  if (value === 'all' || !value) return { type: 'all' }
  if (value.startsWith('path:')) {
    const id = value.slice(5)
    return paths.some((path) => path.id === id) ? { type: 'path', id } : { type: 'all' }
  }
  if (value.startsWith('domain:')) {
    const id = value.slice(7) as Domain
    return DOMAINS.includes(id) ? { type: 'domain', id } : { type: 'all' }
  }
  return { type: 'all' }
}

export function loadFocus(): Focus {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { type: 'all' }
    return parseFocusKey(raw)
  } catch {
    return { type: 'all' }
  }
}

export function saveFocus(focus: Focus) {
  localStorage.setItem(KEY, focusKey(focus))
}

export function focusLabel(focus: Focus): string {
  if (focus.type === 'all') return 'All subjects'
  if (focus.type === 'path') {
    return paths.find((path) => path.id === focus.id)?.title ?? 'Goal'
  }
  return `${DOMAIN_LABEL[focus.id]} only`
}

export function focusTopics(focus: Focus): Topic[] {
  if (focus.type === 'all') return topics
  if (focus.type === 'path') {
    const path = paths.find((item) => item.id === focus.id)
    if (!path) return topics
    return path.nodeIds.map((id) => topicById[id]).filter(Boolean)
  }
  return topics.filter((topic) => topic.domains.includes(focus.id))
}
