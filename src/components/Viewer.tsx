import { useEffect, useState } from 'react'
import type { Resource } from '../data/types'
import { RESOURCE_TYPE_LABEL } from '../data/types'
import { topicById } from '../data'
import { resolveViewable, type ViewerTarget } from '../lib/viewer'
import { Check } from './Check'

export interface Session {
  startedAt: number
  resourceId: string
}

type Props = {
  target: ViewerTarget
  resource: Resource
  /** Other sources tagged for the subject currently open in the reader. */
  queue: Resource[]
  topicId: string | null
  checked: boolean
  session: Session | null
  onSelect: (target: ViewerTarget) => void
  onClose: () => void
  onToggleUsed: () => void
  onStartSession: () => void
  onStopSession: () => void
  onOpenTopic: (id: string) => void
}

export function Viewer({
  target,
  resource,
  queue,
  topicId,
  checked,
  session,
  onSelect,
  onClose,
  onToggleUsed,
  onStartSession,
  onStopSession,
  onOpenTopic,
}: Props) {
  const view = resolveViewable(resource, target.part)
  const [loaded, setLoaded] = useState(false)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    setLoaded(false)
  }, [view.embed])

  useEffect(() => {
    if (!session) return
    const id = window.setInterval(() => setNow(Date.now()), 15000)
    setNow(Date.now())
    return () => window.clearInterval(id)
  }, [session])

  const elapsedMin = session ? Math.max(0, Math.round((now - session.startedAt) / 60000)) : 0
  const sessionHere = session?.resourceId === resource.id
  const parts = resource.parts ?? []
  const otherTopics = resource.nodeIds.filter((id) => id !== topicId)

  return (
    <section className="viewer">
      <header className="viewer-head">
        <div className="viewer-title">
          <div className="kicker" style={{ margin: 0 }}>
            {RESOURCE_TYPE_LABEL[resource.type]} · {resource.authors} · {resource.license}
          </div>
          <h2>{resource.title}</h2>
          {target.part !== null && <div className="viewer-part-name">{view.title}</div>}
        </div>
        <div className="viewer-actions">
          <Check checked={checked} label="Used this" onChange={onToggleUsed} />
          {session ? (
            <button
              className={`ghost session${sessionHere ? ' live' : ''}`}
              onClick={onStopSession}
              title="Stop the timer and prefill a check-in with the elapsed minutes"
            >
              Stop session · {elapsedMin} min
            </button>
          ) : (
            <button className="ghost session" onClick={onStartSession} title="Start a study timer">
              Start session
            </button>
          )}
          <a className="ghost" href={view.url} target="_blank" rel="noopener noreferrer">
            Open in new tab ↗
          </a>
          <button className="ghost" onClick={onClose}>
            Back to map
          </button>
        </div>
      </header>

      {(parts.length > 0 || queue.length > 1) && (
        <nav className="viewer-strip">
          {parts.length > 0 && (
            <div className="viewer-parts">
              {parts.map((part, index) => (
                <button
                  key={`${part.url}-${index}`}
                  className={`part${target.part === index ? ' active' : ''}${part.embeddable === false ? ' blocked' : ''}`}
                  onClick={() => onSelect({ resourceId: resource.id, part: index })}
                  title={part.embeddable === false ? 'Opens in a new tab (publisher blocks embedding)' : part.url}
                >
                  <span className={`part-kind kind-${part.kind ?? 'web'}`} />
                  {part.title}
                </button>
              ))}
            </div>
          )}
          {queue.length > 1 && (
            <label className="viewer-switch">
              <span>Source</span>
              <select
                value={resource.id}
                onChange={(e) => onSelect({ resourceId: e.target.value, part: null })}
              >
                {queue.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </label>
          )}
        </nav>
      )}

      <div className="viewer-frame">
        {view.embeddable ? (
          <>
            {!loaded && <div className="viewer-loading">Loading {view.kind}…</div>}
            <iframe
              key={view.embed}
              src={view.embed}
              title={view.title}
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              onLoad={() => setLoaded(true)}
            />
          </>
        ) : (
          <div className="viewer-blocked">
            <div className="kicker">Cannot be shown inside MathDAG</div>
            <h3>{view.title}</h3>
            <p>
              This publisher forbids embedding its pages in other sites, so the browser will not
              render it here. Open it in a new tab; your check-ins, notes, and checklist stay in
              the panel on the right.
            </p>
            <p className="hint">{resource.description}</p>
            <a className="solid" href={view.url} target="_blank" rel="noopener noreferrer">
              Open in new tab ↗
            </a>
          </div>
        )}
      </div>

      <footer className="viewer-foot">
        <span className="hint">
          {view.embeddable && view.kind !== 'video'
            ? 'Blank panel? Some sites refuse to load inside other pages — use Open in new tab.'
            : 'Nothing is downloaded or stored by MathDAG; the content streams from the publisher.'}
        </span>
        {otherTopics.length > 0 && (
          <span className="viewer-also">
            Also tagged:{' '}
            {otherTopics.map((id) => (
              <button key={id} className="chip" onClick={() => onOpenTopic(id)}>
                {topicById[id]?.title ?? id}
              </button>
            ))}
          </span>
        )}
      </footer>
    </section>
  )
}
