import { useEffect, useState } from 'react'
import { resourcesByNode } from '../data/resources'
import type { ViewerTarget } from '../lib/viewer'
import { DOMAIN_LABEL, type ProgressStatus, type Topic } from '../data/types'
import type { ProgressMap } from '../data/types'
import { topicById } from '../data'
import { fromDateInput, relativeDay, toDateInput } from '../lib/dates'
import { prerequisitesMet } from '../lib/graph'
import { subtopicsFor } from '../data/curriculum'
import { emptyNode, isDone, isSubtopicDone, lastCheckIn } from '../lib/progress'
import { MASTERY_LABEL, masteryOf, nextItem } from '../lib/mastery'
import { Check } from './Check'
import { MasteryBar } from './MasteryBar'
import { ResourceCard } from './ResourceCard'

type Props = {
  topic: Topic
  progress: ProgressMap
  onStatus: (status: ProgressStatus) => void
  onNotes: (notes: string) => void
  onOpenTopic: (id: string) => void
  onClose: () => void
  onToggleDone: () => void
  onCheckIn: (input: { minutes: number; note: string; at: string }) => void
  onRemoveCheckIn: (id: string) => void
  onToggleResource: (resourceId: string) => void
  onToggleIdea: (index: number) => void
  onToggleNode: (id: string) => void
  onToggleSubtopic: (subtopicId: string) => void
  onView: (target: ViewerTarget) => void
  activeResourceId: string | null
  /** Prefill for the check-in form, e.g. from a stopped viewer session. */
  draft: { minutes: number; note: string; key: number } | null
}

const STATUSES: { id: ProgressStatus; label: string }[] = [
  { id: 'none', label: 'Not started' },
  { id: 'in_progress', label: 'In progress' },
  { id: 'known', label: 'Already know' },
  { id: 'completed', label: 'Completed' },
]

export function Reader({
  topic,
  progress,
  onStatus,
  onNotes,
  onOpenTopic,
  onClose,
  onToggleDone,
  onCheckIn,
  onRemoveCheckIn,
  onToggleResource,
  onToggleIdea,
  onToggleNode,
  onToggleSubtopic,
  onView,
  activeResourceId,
  draft,
}: Props) {
  const node = emptyNode(progress[topic.id])
  const status = node.status
  const notes = node.notes
  const locked = !prerequisitesMet(topic.id, progress) && status === 'none'
  const list = resourcesByNode[topic.id] ?? []
  const done = isDone(progress, topic.id)
  const mastery = masteryOf(progress, topic.id)
  const minutes = mastery.minutes
  const last = lastCheckIn(progress, topic.id)
  const next = nextItem(progress, topic.id)
  const [minutesInput, setMinutesInput] = useState('45')
  const [noteInput, setNoteInput] = useState('')
  const [dateInput, setDateInput] = useState(toDateInput())

  useEffect(() => {
    if (!draft) return
    setMinutesInput(String(Math.max(1, draft.minutes)))
    setNoteInput(draft.note)
    setDateInput(toDateInput())
  }, [draft])

  function submitCheckIn() {
    const mins = Number(minutesInput)
    if (!Number.isFinite(mins) || mins <= 0) return
    onCheckIn({
      minutes: mins,
      note: noteInput,
      at: fromDateInput(dateInput),
    })
    setNoteInput('')
  }

  return (
    <article className="reader">
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="kicker" style={{ margin: 0 }}>
          {DOMAIN_LABEL[topic.primary]} · {topic.hours} hours
        </div>
        <button className="ghost" onClick={onClose}>
          Close
        </button>
      </div>
      <h1>{topic.title}</h1>
      <p className="summary">{topic.summary}</p>
      <div className="row">
        {topic.domains.map((domain) => (
          <span key={domain} className={`chip domain-${domain}`}>
            {DOMAIN_LABEL[domain]}
          </span>
        ))}
      </div>

      <div className={`track-box level-${mastery.level}`}>
        <div className="track-head">
          <span className={`level-badge level-${mastery.level}`}>{MASTERY_LABEL[mastery.level]}</span>
          <span className="track-pct">{mastery.pct}%</span>
        </div>
        <MasteryBar pct={mastery.pct} level={mastery.level} />
        <div className="track-parts">
          {mastery.subtopics.total > 0 && (
            <span>
              Curriculum <strong>{mastery.subtopics.done}/{mastery.subtopics.total}</strong>
            </span>
          )}
          <span>
            Ideas <strong>{mastery.ideas.done}/{mastery.ideas.total}</strong>
          </span>
          <span>
            Sources <strong>{mastery.resources.done}/{mastery.resources.total}</strong>
          </span>
          <span>
            Time <strong>{minutes} min</strong>
          </span>
        </div>
        <Check
          checked={done}
          partial={status === 'in_progress'}
          label={done ? 'Checked off — mastered' : 'Check off this subject (mastered)'}
          onChange={onToggleDone}
        />
        <p className="hint" style={{ margin: '8px 0 0' }}>
          {done
            ? 'Counts as mastered and unlocks what depends on it.'
            : next
              ? `Next: ${next}`
              : 'Everything ticked — check the subject off when you can do the work.'}
          {last ? ` · last check-in ${relativeDay(last.at)}` : ''}
        </p>
      </div>

      {locked && (
        <p className="warning">
          Prerequisites are unfinished. You can still read and check in; completing earlier
          nodes marks this available on the map.
        </p>
      )}
      <div className="status-row">
        {STATUSES.map((item) => (
          <button
            key={item.id}
            className={`ghost on-${status === item.id ? item.id : 'off'}`}
            onClick={() => onStatus(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <section className="section">
        <h2>Check in</h2>
        <p className="hint">
          Log a study block. This does not download anything. Checking in sets the subject to
          in progress if it was untouched.
        </p>
        <div className="checkin-form">
          <label>
            Minutes
            <input
              type="number"
              min={1}
              max={600}
              value={minutesInput}
              onChange={(e) => setMinutesInput(e.target.value)}
            />
          </label>
          <label>
            Date
            <input
              type="date"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
            />
          </label>
          <label className="grow">
            What did you do?
            <input
              value={noteInput}
              placeholder="Tong notes ch. 3, or 8.04 lecture 4"
              onChange={(e) => setNoteInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') submitCheckIn()
              }}
            />
          </label>
          <button className="solid" onClick={submitCheckIn}>
            Check in
          </button>
        </div>
        {node.checkins.length > 0 && (
          <ol className="checkin-list">
            {node.checkins.map((entry) => (
              <li key={entry.id}>
                <div>
                  <strong>{relativeDay(entry.at)}</strong>
                  <span className="hint"> · {entry.minutes} min</span>
                  {entry.note && <p>{entry.note}</p>}
                </div>
                <button className="ghost" onClick={() => onRemoveCheckIn(entry.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ol>
        )}
      </section>

      <section className="section" id="resources">
        <h2>Study material</h2>
        <p className="hint">
          View here loads videos, PDFs, and notes in the middle panel so you can watch, read, and
          check in without leaving. Check a source when you have used it.
        </p>
        {list.length === 0 && (
          <p className="hint">No open resources tagged for this node yet.</p>
        )}
        {list.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            checked={node.resourcesDone.includes(resource.id)}
            onToggle={() => onToggleResource(resource.id)}
            onView={onView}
            active={activeResourceId === resource.id}
          />
        ))}
      </section>

      <section className="section">
        <h2>Overview</h2>
        {topic.overview.split('\n\n').map((para) => (
          <p key={para.slice(0, 24)}>{para}</p>
        ))}
      </section>

      {subtopicsFor(topic.id).length > 0 && (
        <section className="section">
          <h2>Curriculum</h2>
          <p className="hint">
            Check an item when you can do the work, not when you have only watched a lecture.
            {` ${subtopicsFor(topic.id).filter((item) => isSubtopicDone(progress, topic.id, item.id)).length}/${subtopicsFor(topic.id).length} done.`}
          </p>
          <ul className="idea-checks">
            {subtopicsFor(topic.id).map((item) => (
              <li key={item.id}>
                <Check
                  checked={isSubtopicDone(progress, topic.id, item.id)}
                  label={item.title}
                  onChange={() => onToggleSubtopic(item.id)}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="section">
        <h2>Core ideas</h2>
        <p className="hint">Check an idea when you can explain it without notes.</p>
        <ul className="idea-checks">
          {topic.ideas.map((idea, index) => (
            <li key={idea}>
              <Check
                checked={node.ideasDone.includes(index)}
                label={idea}
                onChange={() => onToggleIdea(index)}
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2>How to study</h2>
        <p>{topic.study}</p>
      </section>

      <section className="section">
        <h2>What this unlocks</h2>
        <p>{topic.unlocks}</p>
      </section>

      <section className="section">
        <h2>Prerequisites</h2>
        {topic.prerequisites.length === 0 ? (
          <p className="hint">Root node — no prerequisites.</p>
        ) : (
          <div className="rel-list related-checks">
            {topic.prerequisites.map((id) => (
              <div key={id} className="related-row">
                <Check
                  checked={isDone(progress, id)}
                  onChange={() => onToggleNode(id)}
                  title="Check off"
                />
                <button onClick={() => onOpenTopic(id)}>{topicById[id]?.title ?? id}</button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="section">
        <h2>Opens next</h2>
        <Unlocks
          id={topic.id}
          progress={progress}
          onOpenTopic={onOpenTopic}
          onToggleNode={onToggleNode}
        />
      </section>

      <section className="section">
        <h2>Your notes</h2>
        <textarea
          className="notes"
          value={notes}
          placeholder="Standing notes for this node. Check-ins are the dated log above."
          onChange={(e) => onNotes(e.target.value)}
        />
      </section>
    </article>
  )
}

function Unlocks({
  id,
  progress,
  onOpenTopic,
  onToggleNode,
}: {
  id: string
  progress: ProgressMap
  onOpenTopic: (id: string) => void
  onToggleNode: (id: string) => void
}) {
  const next = Object.values(topicById).filter((topic) => topic.prerequisites.includes(id))
  if (next.length === 0) return <p className="hint">Capstone or leaf — nothing lists this as a prerequisite.</p>
  return (
    <div className="rel-list related-checks">
      {next.map((topic) => (
        <div key={topic.id} className="related-row">
          <Check
            checked={isDone(progress, topic.id)}
            onChange={() => onToggleNode(topic.id)}
            title="Check off"
          />
          <button onClick={() => onOpenTopic(topic.id)}>{topic.title}</button>
        </div>
      ))}
    </div>
  )
}
