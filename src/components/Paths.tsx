import { paths } from '../data/paths'
import { topicById } from '../data'
import type { ProgressMap } from '../data/types'
import { isDone } from '../lib/progress'
import { Check } from './Check'

type Props = {
  progress: ProgressMap
  onOpenTopic: (id: string) => void
  onToggle: (id: string) => void
}

export function Paths({ progress, onOpenTopic, onToggle }: Props) {
  return (
    <div className="paths-page">
      <div className="kicker">Guided routes</div>
      <h2>Study paths</h2>
      <p className="hint">
        Check a node off when it is done. The box toggles completion; the name opens the
        section.
      </p>
      {paths.map((path) => {
        const done = path.nodeIds.filter((id) => isDone(progress, id)).length
        const hours = path.nodeIds.reduce((sum, id) => sum + (topicById[id]?.hours ?? 0), 0)
        const pct = Math.round((done / path.nodeIds.length) * 100)
        return (
          <article key={path.id} className="path-card">
            <h3>{path.title}</h3>
            <p className="hint">{path.subtitle}</p>
            <div className="top-stats" style={{ margin: '10px 0 0' }}>
              <span>
                {done}/{path.nodeIds.length} · {pct}% · ~{hours}h
              </span>
              <div className="meter">
                <span style={{ width: `${pct}%` }} />
              </div>
            </div>
            <ol className="path-checks">
              {path.nodeIds.map((id) => (
                <li key={id} className={isDone(progress, id) ? 'done' : ''}>
                  <Check
                    checked={isDone(progress, id)}
                    onChange={() => onToggle(id)}
                    title="Check off"
                  />
                  <button onClick={() => onOpenTopic(id)}>{topicById[id]?.title ?? id}</button>
                </li>
              ))}
            </ol>
          </article>
        )
      })}
    </div>
  )
}
