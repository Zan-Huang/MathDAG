import { useState } from 'react'
import type { Resource } from '../data/types'
import { RESOURCE_TYPE_LABEL } from '../data/types'
import { topicById } from '../data'
import { canView, firstViewable, isYouTubeChannel, type ViewerTarget } from '../lib/viewer'
import { Check } from './Check'

type Props = {
  resource: Resource
  onOpenTopic?: (id: string) => void
  checked?: boolean
  onToggle?: () => void
  onView?: (target: ViewerTarget) => void
  /** Highlight when this resource is the one currently shown in the viewer. */
  active?: boolean
}

export function ResourceCard({ resource, onOpenTopic, checked, onToggle, onView, active }: Props) {
  const [copied, setCopied] = useState(false)
  const viewable = canView(resource)
  const parts = resource.parts ?? []

  async function copy() {
    try {
      await navigator.clipboard.writeText(resource.url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      setCopied(false)
    }
  }

  return (
    <article className={`resource${checked ? ' used' : ''}${active ? ' active' : ''}`}>
      {onToggle && (
        <Check
          checked={Boolean(checked)}
          label="Used this"
          onChange={onToggle}
        />
      )}
      <h3>{resource.title}</h3>
      <div className="meta">
        {resource.authors} · {RESOURCE_TYPE_LABEL[resource.type]} · {resource.format} ·{' '}
        {resource.difficulty} · {resource.license}
      </div>
      <p>{resource.description}</p>
      {onOpenTopic && (
        <div className="row">
          {resource.nodeIds.map((id) => (
            <button key={id} className="chip" onClick={() => onOpenTopic(id)}>
              {topicById[id]?.title ?? id}
            </button>
          ))}
        </div>
      )}
      <div className="resource-actions">
        {onView && viewable ? (
          <button
            className="solid"
            onClick={() => onView({ resourceId: resource.id, part: firstViewable(resource) })}
          >
            {active ? 'Viewing' : 'View here'}
          </button>
        ) : (
          <a className="solid" href={resource.url} target="_blank" rel="noopener noreferrer">
            Open ↗
          </a>
        )}
        {onView && viewable && (
          <a className="ghost" href={resource.url} target="_blank" rel="noopener noreferrer">
            Open ↗
          </a>
        )}
        <button className="ghost" onClick={copy}>
          {copied ? 'Copied' : 'Copy link'}
        </button>
      </div>
      {onView && parts.length > 0 && (
        <ul className="resource-parts">
          {parts.map((part, index) => {
            const blocked = part.embeddable === false || isYouTubeChannel(part.url)
            return (
              <li key={`${part.url}-${index}`}>
                <span className={`part-kind kind-${part.kind ?? 'web'}`} />
                {blocked ? (
                  <a href={part.url} target="_blank" rel="noopener noreferrer">
                    {part.title} ↗
                  </a>
                ) : (
                  <button onClick={() => onView({ resourceId: resource.id, part: index })}>
                    {part.title}
                  </button>
                )}
              </li>
            )
          })}
        </ul>
      )}
      {!viewable && onView && (
        <p className="hint" style={{ margin: '8px 0 0' }}>
          Publisher blocks embedding; opens in a new tab.
        </p>
      )}
    </article>
  )
}
