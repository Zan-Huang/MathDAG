import { useMemo, useState } from 'react'
import { resources } from '../data/resources'
import { RESOURCE_TYPES, RESOURCE_TYPE_LABEL, type ResourceType } from '../data/types'
import { canView, type ViewerTarget } from '../lib/viewer'
import { ResourceCard } from './ResourceCard'

type Props = {
  onOpenTopic: (id: string) => void
  onView: (target: ViewerTarget) => void
}

export function Library({ onOpenTopic, onView }: Props) {
  const [query, setQuery] = useState('')
  const [type, setType] = useState<ResourceType | 'all'>('all')
  const [format, setFormat] = useState<'all' | 'web' | 'pdf' | 'video' | 'interactive'>('all')

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    return resources.filter((resource) => {
      if (type !== 'all' && resource.type !== type) return false
      if (format !== 'all' && resource.format !== format) return false
      if (!q) return true
      return `${resource.title} ${resource.authors} ${resource.description}`
        .toLowerCase()
        .includes(q)
    })
  }, [query, type, format])

  return (
    <div className="library">
      <div className="kicker">Pooled catalog</div>
      <h2>Open resources</h2>
      <p className="hint">
        {resources.length} books, courses, notes, videos, and papers that are free to open for
        personal study. {resources.filter(canView).length} can be viewed inside MathDAG; the rest
        open in a new tab because the publisher forbids embedding. Nothing is downloaded or saved
        by the app.
      </p>
      <div className="toolbar">
        <input
          className="search"
          style={{ maxWidth: 360, margin: 0 }}
          value={query}
          placeholder="Search title, author, description"
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value as ResourceType | 'all')}>
          <option value="all">All types</option>
          {RESOURCE_TYPES.map((item) => (
            <option key={item} value={item}>
              {RESOURCE_TYPE_LABEL[item]}
            </option>
          ))}
        </select>
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value as typeof format)}
        >
          <option value="all">All formats</option>
          <option value="web">Web</option>
          <option value="pdf">PDF</option>
          <option value="video">Video</option>
          <option value="interactive">Interactive</option>
        </select>
      </div>
      <p className="hint">{list.length} shown</p>
      <div className="grid">
        {list.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            onOpenTopic={onOpenTopic}
            onView={onView}
          />
        ))}
      </div>
    </div>
  )
}
