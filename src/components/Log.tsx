import { topicById } from '../data'
import type { ProgressMap } from '../data/types'
import { formatDayTime } from '../lib/dates'
import { allCheckIns, minutesSince } from '../lib/progress'

type Props = {
  progress: ProgressMap
  onOpenTopic: (id: string) => void
}

export function Log({ progress, onOpenTopic }: Props) {
  const entries = allCheckIns(progress)
  const week = minutesSince(progress, Date.now() - 7 * 86400000)
  const total = entries.reduce((sum, item) => sum + item.minutes, 0)

  return (
    <div className="paths-page">
      <div className="kicker">Study log</div>
      <h2>Check-ins</h2>
      <p className="hint">
        {entries.length} sessions · {total} minutes total · {week} minutes in the last 7 days.
        Check in from any subject page after a study block.
      </p>
      {entries.length === 0 ? (
        <p className="empty">No check-ins yet. Open a subject and log a session.</p>
      ) : (
        <ol className="log-list">
          {entries.map((entry) => (
            <li key={`${entry.nodeId}-${entry.id}`}>
              <div className="log-when">{formatDayTime(entry.at)}</div>
              <button className="log-topic" onClick={() => onOpenTopic(entry.nodeId)}>
                {topicById[entry.nodeId]?.title ?? entry.nodeId}
              </button>
              <div className="log-meta">{entry.minutes} min</div>
              {entry.note && <p className="log-note">{entry.note}</p>}
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
