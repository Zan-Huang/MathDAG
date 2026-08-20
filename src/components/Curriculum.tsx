import { useMemo, useState } from 'react'
import {
  CURRICULUM_TRACKS,
  CURRICULUM_TRACK_LABEL,
  curricula,
  type CurriculumTrack,
} from '../data/curriculum'
import { rankOf, topicById } from '../data'
import type { ProgressMap } from '../data/types'
import { isDone, isSubtopicDone } from '../lib/progress'
import { Check } from './Check'

type Props = {
  progress: ProgressMap
  onToggle: (topicId: string, subtopicId: string) => void
  onOpenTopic: (id: string) => void
  onToggleSubject: (id: string) => void
}

export function Curriculum({ progress, onToggle, onOpenTopic, onToggleSubject }: Props) {
  const [track, setTrack] = useState<CurriculumTrack>('math')
  const [query, setQuery] = useState('')
  const [hideDone, setHideDone] = useState(false)
  const catalog = curricula[track]
  const [open, setOpen] = useState<Record<string, boolean>>({})

  const subjects = useMemo(() => {
    return Object.keys(catalog).sort((a, b) => {
      const ra = rankOf(a)
      const rb = rankOf(b)
      if (ra !== rb) return ra - rb
      return (topicById[a]?.title ?? a).localeCompare(topicById[b]?.title ?? b)
    })
  }, [catalog])

  const q = query.trim().toLowerCase()
  let items = 0
  let checked = 0
  let subjectsFinished = 0

  const blocks = subjects
    .map((id) => {
      const list = catalog[id]
      const doneCount = list.filter((item) => isSubtopicDone(progress, id, item.id)).length
      items += list.length
      checked += doneCount
      if (list.length > 0 && doneCount === list.length) subjectsFinished += 1
      const topic = topicById[id]
      const title = topic?.title ?? id
      const matches =
        !q ||
        title.toLowerCase().includes(q) ||
        list.some((item) => item.title.toLowerCase().includes(q))
      return { id, list, doneCount, title, matches, topic }
    })
    .filter((block) => block.matches)
    .filter((block) => !hideDone || block.doneCount < block.list.length)

  const pct = items ? Math.round((checked / items) * 100) : 0
  const isOpen = (id: string) => open[id] !== false

  return (
    <div className="paths-page curriculum-page">
      <div className="kicker">Syllabus checklists</div>
      <h2>{CURRICULUM_TRACK_LABEL[track]} curriculum</h2>
      <p className="hint">
        Each subject is broken into items you can actually finish. Check a line when you can
        do the work and explain it. Ticking every line does not automatically mark the
        subject complete on the map.
      </p>
      <div className="nav" style={{ margin: '12px 0' }}>
        {CURRICULUM_TRACKS.map((id) => (
          <button
            key={id}
            className={track === id ? 'active' : ''}
            onClick={() => {
              setTrack(id)
              setQuery('')
            }}
          >
            {CURRICULUM_TRACK_LABEL[id]}
          </button>
        ))}
      </div>
      <div className="top-stats" style={{ margin: '12px 0 16px' }}>
        <span>
          {checked}/{items} items · {pct}% · {subjectsFinished}/{subjects.length} subjects fully
          ticked
        </span>
        <div className="meter">
          <span style={{ width: `${pct}%` }} />
        </div>
      </div>
      <div className="toolbar">
        <input
          className="search"
          style={{ maxWidth: 360, margin: 0 }}
          value={query}
          placeholder="Search a subject or item"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="ghost" onClick={() => setHideDone((v) => !v)}>
          {hideDone ? 'Showing remaining' : 'Hide finished subjects'}
        </button>
        <button
          className="ghost"
          onClick={() => setOpen(Object.fromEntries(subjects.map((id) => [id, true])))}
        >
          Expand all
        </button>
        <button
          className="ghost"
          onClick={() => setOpen(Object.fromEntries(subjects.map((id) => [id, false])))}
        >
          Collapse all
        </button>
      </div>
      {blocks.map((block) => {
        const subjectDone = isDone(progress, block.id)
        const allItems = block.doneCount === block.list.length && block.list.length > 0
        const partial = block.doneCount > 0 && !allItems
        const visibleItems = q
          ? block.list.filter(
              (item) =>
                item.title.toLowerCase().includes(q) ||
                block.title.toLowerCase().includes(q),
            )
          : block.list
        return (
          <article key={block.id} className="path-card curriculum-card">
            <div className="curriculum-head">
              <Check
                checked={allItems || subjectDone}
                partial={partial && !subjectDone}
                onChange={() => onToggleSubject(block.id)}
                title="Mark the whole subject done or not"
              />
              <button className="curriculum-title" onClick={() => onOpenTopic(block.id)}>
                {block.title}
              </button>
              <span className="legend-count">
                {block.doneCount}/{block.list.length}
                {subjectDone ? ' · subject checked' : ''}
              </span>
              <button
                className="ghost"
                onClick={() => setOpen((cur) => ({ ...cur, [block.id]: !isOpen(block.id) }))}
              >
                {isOpen(block.id) ? 'Hide items' : 'Show items'}
              </button>
            </div>
            <div className="meter" style={{ marginTop: 8 }}>
              <span
                style={{
                  width: `${block.list.length ? Math.round((block.doneCount / block.list.length) * 100) : 0}%`,
                }}
              />
            </div>
            {isOpen(block.id) && (
              <ol className="curriculum-items">
                {visibleItems.map((item) => (
                  <li key={item.id}>
                    <Check
                      checked={isSubtopicDone(progress, block.id, item.id)}
                      label={item.title}
                      onChange={() => onToggle(block.id, item.id)}
                    />
                  </li>
                ))}
              </ol>
            )}
          </article>
        )
      })}
    </div>
  )
}
