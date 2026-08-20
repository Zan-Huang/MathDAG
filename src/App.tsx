import { useMemo, useRef, useState } from 'react'
import { GraphMap } from './components/GraphMap'
import { Library } from './components/Library'
import { Log } from './components/Log'
import { Paths } from './components/Paths'
import { Reader } from './components/Reader'
import { paths } from './data/paths'
import { assertGraph, topicById, topics } from './data'
import { DOMAIN_LABEL, DOMAINS, type Domain, type ProgressStatus } from './data/types'
import { resourcesByNode } from './data/resources'
import { availability } from './lib/graph'
import { relativeDay } from './lib/dates'
import {
  focusKey,
  focusLabel,
  focusTopics,
  loadFocus,
  parseFocusKey,
  saveFocus,
  type Focus,
} from './lib/focus'
import {
  addCheckIn,
  allCheckIns,
  exportProgress,
  importProgress,
  isDone,
  lastCheckIn,
  loadProgress,
  minutesSince,
  removeCheckIn,
  setNotes,
  setStatus,
  toggleDone,
  toggleIdea,
  toggleResource,
} from './lib/progress'

type View = 'map' | 'library' | 'paths' | 'log'

const graphErrors = assertGraph()

export default function App() {
  const [view, setView] = useState<View>('map')
  const [progress, setProgress] = useState(loadProgress)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [focus, setFocusState] = useState<Focus>(loadFocus)
  const [domains, setDomains] = useState<Record<Domain, boolean>>(() =>
    Object.fromEntries(DOMAINS.map((d) => [d, true])) as Record<Domain, boolean>,
  )
  const fileRef = useRef<HTMLInputElement>(null)

  function setFocus(next: Focus) {
    saveFocus(next)
    setFocusState(next)
  }

  const scoped = useMemo(() => focusTopics(focus), [focus])
  const selected = selectedId ? topicById[selectedId] : null
  const done = scoped.filter((topic) => isDone(progress, topic.id)).length
  const hoursDone = scoped
    .filter((topic) => isDone(progress, topic.id))
    .reduce((sum, topic) => sum + topic.hours, 0)
  const hoursAll = scoped.reduce((sum, topic) => sum + topic.hours, 0)
  const pct = scoped.length ? Math.round((done / scoped.length) * 100) : 0
  const weekMin = minutesSince(progress, Date.now() - 7 * 86400000)
  const scopedIds = useMemo(() => new Set(scoped.map((topic) => topic.id)), [scoped])
  const recent = allCheckIns(progress)
    .filter((entry) => scopedIds.has(entry.nodeId))
    .slice(0, 6)

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return scoped.filter((topic) => {
      if (focus.type === 'all' && !topic.domains.some((domain) => domains[domain])) {
        return false
      }
      if (!q) return true
      return `${topic.title} ${topic.summary} ${topic.primary}`.toLowerCase().includes(q)
    })
  }, [query, domains, scoped, focus.type])

  function openTopic(id: string) {
    setSelectedId(id)
    setView('map')
  }

  function toggleDomain(domain: Domain) {
    setDomains((current) => ({ ...current, [domain]: !current[domain] }))
  }

  function downloadProgress() {
    const blob = new Blob([exportProgress(progress)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'mathdag-progress.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-name">MathDAG</div>
          <div className="brand-sub">Physics · Neuro · AI</div>
        </div>
        <nav className="nav">
          <button className={view === 'map' ? 'active' : ''} onClick={() => setView('map')}>
            Map
          </button>
          <button className={view === 'library' ? 'active' : ''} onClick={() => setView('library')}>
            Library
          </button>
          <button className={view === 'paths' ? 'active' : ''} onClick={() => setView('paths')}>
            Paths
          </button>
          <button className={view === 'log' ? 'active' : ''} onClick={() => setView('log')}>
            Log
          </button>
        </nav>
        <label className="focus-control">
          <span>Focus</span>
          <select
            value={focusKey(focus)}
            onChange={(e) => {
              setFocus(parseFocusKey(e.target.value))
              setView('map')
            }}
          >
            <option value="all">All subjects</option>
            <optgroup label="Goals">
              {paths.map((path) => (
                <option key={path.id} value={`path:${path.id}`}>
                  {path.title}
                </option>
              ))}
            </optgroup>
            <optgroup label="Field only">
              {DOMAINS.map((domain) => (
                <option key={domain} value={`domain:${domain}`}>
                  {DOMAIN_LABEL[domain]} only
                </option>
              ))}
            </optgroup>
          </select>
        </label>
        <div className="top-stats">
          <span>
            {done}/{scoped.length} · {pct}%
            {focus.type !== 'all' ? ` · ${focusLabel(focus)}` : ''} · {weekMin} min / 7d
          </span>
          <div className="meter" title={`${pct}% complete · ${hoursDone}/${hoursAll}h checked off`}>
            <span style={{ width: `${pct}%` }} />
          </div>
          <button className="ghost" onClick={downloadProgress}>
            Export
          </button>
          <button className="ghost" onClick={() => fileRef.current?.click()}>
            Import
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (!file) return
              file.text().then((text) => {
                setProgress(importProgress(text))
              })
              e.target.value = ''
            }}
          />
        </div>
      </header>

      {view === 'map' && (
        <div className={`workspace${selected ? ' reading' : ''}`}>
          <aside className="side">
            <h2>{focus.type === 'all' ? 'Filter the graph' : focusLabel(focus)}</h2>
            <p>
              {focus.type === 'all'
                ? 'Check a node to mark it done. Use Focus to show one goal or field.'
                : focus.type === 'path'
                  ? 'Only this route is on the map, including the prerequisites it needs.'
                  : 'Only subjects tagged with this field. Shared math and other fields are hidden.'}
            </p>
            {focus.type !== 'all' && (
              <button className="ghost" style={{ marginBottom: 12 }} onClick={() => setFocus({ type: 'all' })}>
                Show all subjects
              </button>
            )}
            <input
              className="search"
              value={query}
              placeholder="Search subjects"
              onChange={(e) => setQuery(e.target.value)}
            />
            {focus.type === 'all' && (
            <div className="filters">
              {DOMAINS.map((domain) => {
                const count = topics.filter((topic) => topic.domains.includes(domain)).length
                const finished = topics.filter(
                  (topic) => topic.domains.includes(domain) && isDone(progress, topic.id),
                ).length
                return (
                  <div className="filter-row" key={domain}>
                    <button
                      className={domains[domain] ? 'on' : ''}
                      onClick={() => toggleDomain(domain)}
                    >
                      <span className="swatch" style={{ background: `var(--${domain})` }} />
                      {DOMAIN_LABEL[domain]}
                    </button>
                    <span className="legend-count">
                      {finished}/{count}
                    </span>
                  </div>
                )
              })}
            </div>
            )}
            <h2>Frontier</h2>
            <p className="hint">Unlocked and not yet checked off.</p>
            <div className="rel-list">
              {visible
                .filter((topic) => availability(topic.id, progress) === 'available')
                .slice(0, 10)
                .map((topic) => (
                  <button key={topic.id} onClick={() => setSelectedId(topic.id)}>
                    {topic.title}
                  </button>
                ))}
            </div>
            <h2>Recent check-ins</h2>
            {recent.length === 0 ? (
              <p className="hint">None yet. Open a subject and log minutes.</p>
            ) : (
              <div className="rel-list">
                {recent.map((entry) => (
                  <button key={`${entry.nodeId}-${entry.id}`} onClick={() => openTopic(entry.nodeId)}>
                    {topicById[entry.nodeId]?.title ?? entry.nodeId}
                    <span className="legend-count">
                      {' '}
                      · {relativeDay(entry.at)} · {entry.minutes}m
                    </span>
                  </button>
                ))}
              </div>
            )}
            {graphErrors.length > 0 && (
              <p className="warning">Graph errors: {graphErrors.join('; ')}</p>
            )}
            <div className="import-box">
              <p className="hint">
                {visible.length} nodes on the map. {Object.keys(resourcesByNode).length} have
                tagged resources.
                {selectedId && lastCheckIn(progress, selectedId)
                  ? ` This subject last logged ${relativeDay(lastCheckIn(progress, selectedId)!.at)}.`
                  : ''}
              </p>
            </div>
          </aside>
          <GraphMap
            topics={visible}
            progress={progress}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onToggle={(id) => setProgress((map) => toggleDone(map, id))}
            caption={
              focus.type === 'all'
                ? undefined
                : `${focusLabel(focus)} · ${visible.length} subjects`
            }
          />
          {selected && (
            <Reader
              topic={selected}
              progress={progress}
              onOpenTopic={openTopic}
              onClose={() => setSelectedId(null)}
              onStatus={(status: ProgressStatus) =>
                setProgress((map) => setStatus(map, selected.id, status))
              }
              onNotes={(notes) => setProgress((map) => setNotes(map, selected.id, notes))}
              onToggleDone={() => setProgress((map) => toggleDone(map, selected.id))}
              onCheckIn={(input) => setProgress((map) => addCheckIn(map, selected.id, input))}
              onRemoveCheckIn={(checkInId) =>
                setProgress((map) => removeCheckIn(map, selected.id, checkInId))
              }
              onToggleResource={(resourceId) =>
                setProgress((map) => toggleResource(map, selected.id, resourceId))
              }
              onToggleIdea={(index) => setProgress((map) => toggleIdea(map, selected.id, index))}
              onToggleNode={(id) => setProgress((map) => toggleDone(map, id))}
            />
          )}
        </div>
      )}

      {view === 'library' && <Library onOpenTopic={openTopic} />}
      {view === 'paths' && (
        <Paths
          progress={progress}
          onOpenTopic={openTopic}
          onToggle={(id) => setProgress((map) => toggleDone(map, id))}
          onFocus={(id) => {
            setFocus({ type: 'path', id })
            setView('map')
          }}
        />
      )}
      {view === 'log' && <Log progress={progress} onOpenTopic={openTopic} />}
    </div>
  )
}
