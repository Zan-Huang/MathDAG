import { useState } from 'react'
import type { Resource } from '../data/types'
import { RESOURCE_TYPE_LABEL } from '../data/types'
import { topicById } from '../data'
import { Check } from './Check'

type Props = {
  resource: Resource
  onOpenTopic?: (id: string) => void
  checked?: boolean
  onToggle?: () => void
}

export function ResourceCard({ resource, onOpenTopic, checked, onToggle }: Props) {
  const [copied, setCopied] = useState(false)

  function open() {
    window.open(resource.url, '_blank', 'noopener,noreferrer')
  }

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
    <article className={`resource${checked ? ' used' : ''}`}>
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
        <button className="solid" onClick={open}>
          Open
        </button>
        <button className="ghost" onClick={copy}>
          {copied ? 'Copied' : 'Copy link'}
        </button>
      </div>
    </article>
  )
}
