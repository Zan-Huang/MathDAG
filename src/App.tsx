import { useEffect, useMemo, useRef, useState } from 'react'
import { Curriculum } from './components/Curriculum'
import { GraphMap } from './components/GraphMap'
import { Library } from './components/Library'
import { Paths } from './components/Paths'
import { Progress } from './components/Progress'
import { Reader } from './components/Reader'
import { Viewer, type Session } from './components/Viewer'
import { paths } from './data/paths'
import { assertGraph, topicById, topics } from './data'
import { DOMAIN_LABEL, DOMAINS, type Domain, type ProgressStatus } from './data/types'
import { resourcesById, resourcesByNode } from './data/resources'
import { availability } from './lib/graph'
import { relativeDay, toDateInput } from './lib/dates'
import { resolveViewable, type ViewerTarget } from './lib/viewer'
import {
  focusKey,
  focusLabel,
  focusTopics,
  loadFocus,
  parseFocusKey,
  saveFocus,
  type Focus,
} from './lib/focus'
import { dayStats, loadGoal, saveGoal, streaks, summarize, trailing } from './lib/mastery'
import {
  addCheckIn,
  addTrackedMinutes,
  allCheckIns,
  allEvents,
  exportProgress,
  importProgress,
  isDone,
  lastCheckIn,
  loadProgress,
  recordView,
  removeCheckIn,
  setNotes,
  setStatus,
  toggleDone,
  toggleIdea,
  toggleResource,
  toggleSubtopic,
} from './lib/progress'

type View = 'map' | 'library' | 'paths' | 'progress' | 'curriculum'

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
  const [viewer, setViewer] = useState<ViewerTarget | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [draft, setDraft] = useState<{ minutes: number; note: string; key: number } | null>(null)
  const [goal, setGoalState] = useState(loadGoal)

  function setFocus(next: Focus) {
    saveFocus(next)
    setFocusState(next)
  }

  function setGoal(minutes: number) {
    saveGoal(minutes)
    setGoalState(minutes)
  }

  const scoped = useMemo(() => focusTopics(focus), [focus])
  const selected = selectedId ? topicById[selectedId] : null
  const viewerResource = viewer ? resourcesById[viewer.resourceId] : null
  /** Subject that automatically tracked viewer time is credited to. */
  const trackTopicId = viewerResource
    ? selectedId && viewerResource.nodeIds.includes(selectedId)
      ? selectedId
      : viewerResource.nodeIds[0] ?? null
    : null

  /** Open a resource in the middle panel and make sure a matching subject is in the reader. */
  function openResource(target: ViewerTarget) {
    const resource = resourcesById[target.resourceId]
    if (!resource) return
    let topicId = selectedId
    if (!topicId || !resource.nodeIds.includes(topicId)) {
      const inScope = resource.nodeIds.find((id) => scoped.some((topic) => topic.id === id))
      topicId = inScope ?? resource.nodeIds[0] ?? null
      setSelectedId(topicId)
    }
    if (topicId) setProgress((map) => recordView(map, topicId!, resource.id))
    setViewer(target)
    setView('map')
  }

  // Passive time tracking: while material is open in the viewer and the tab is visible,
  // credit one minute per minute to the subject. No button to press.
  useEffect(() => {
    if (!viewer || !trackTopicId || view !== 'map') return
    const id = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return
      setProgress((map) => addTrackedMinutes(map, trackTopicId, 1))
    }, 60000)
    return () => window.clearInterval(id)
  }, [viewer, trackTopicId, view])

  function startSession() {
    if (!viewerResource) return
    setSession({ startedAt: Date.now(), resourceId: viewerResource.id })
  }

  /** Stop the timer and hand the elapsed minutes to the reader's check-in form. */
  function stopSession() {
    if (!session) return
    const minutes = Math.max(1, Math.round((Date.now() - session.startedAt) / 60000))
    const resource = resourcesById[session.resourceId]
    const partTitle =
      viewer && viewer.resourceId === session.resourceId && resource
        ? resolveViewable(resource, viewer.part).title
        : null
    const note = resource
      ? partTitle && partTitle !== resource.title
        ? `${resource.title} — ${partTitle}`
        : resource.title
      : ''
    setDraft({ minutes, note, key: Date.now() })
    setSession(null)
  }

  useEffect(() => {
    if (!viewer) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setViewer(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [viewer])
  const summary = useMemo(() => summarize(progress, scoped), [progress, scoped])
  const stats = useMemo(() => dayStats(progress), [progress])
  const streak = useMemo(() => streaks(stats), [stats])
  const weekMin = useMemo(() => trailing(stats, 7).minutes, [stats])
  const done = summary.counts.mastered
  const pct = summary.pct
  const scopedIds = useMemo(() => new Set(scoped.map((topic) => topic.id)), [scoped])
  const recent = useMemo(() => {
    const items = [
      ...allCheckIns(progress).map((entry) => ({
        key: `c-${entry.nodeId}-${entry.id}`,
        at: entry.at,
        nodeId: entry.nodeId,
        text: `${entry.minutes} min`,
      })),
      ...allEvents(progress)
        .filter((event) => event.kind !== 'view')
        .map((event) => ({
          key: `e-${event.nodeId}-${event.id}`,
          at: event.at,
          nodeId: event.nodeId,
          text: event.kind === 'mastered' ? 'mastered' : event.label,
        })),
    ]
    return items
      .filter((entry) => scopedIds.has(entry.nodeId))
      .sort((a, b) => Date.parse(b.at) - Date.parse(a.at))
      .slice(0, 6)
  }, [progress, scopedIds])

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
          <button
            className={view === 'map' && !viewer ? 'active' : ''}
            onClick={() => {
              setViewer(null)
              setView('map')
            }}
          >
            Map
          </button>
          {viewerResource && (
            <button
              className={view === 'map' && viewer ? 'active' : ''}
              onClick={() => setView('map')}
              title={viewerResource.title}
            >
              Viewer
            </button>
          )}
          <button className={view === 'library' ? 'active' : ''} onClick={() => setView('library')}>
            Library
          </button>
          <button className={view === 'paths' ? 'active' : ''} onClick={() => setView('paths')}>
            Paths
          </button>
          <button className={view === 'curriculum' ? 'active' : ''} onClick={() => setView('curriculum')}>
            Syllabus
          </button>
          <button className={view === 'progress' ? 'active' : ''} onClick={() => setView('progress')}>
            Progress
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
          <button
            className="top-mastery"
            onClick={() => setView('progress')}
            title={`${summary.earnedHours}/${summary.hours} subject-hours · ${done}/${scoped.length} mastered${focus.type !== 'all' ? ` · ${focusLabel(focus)}` : ''}`}
          >
            <span>
              Mastery {pct}% · {done}/{scoped.length} · {weekMin} min / 7d
              {streak.current > 0 ? ` · ${streak.current}d streak` : ''}
            </span>
            <div className="meter">
              <span style={{ width: `${pct}%` }} />
            </div>
          </button>
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
            <h2>Recent activity</h2>
            {recent.length === 0 ? (
              <p className="hint">None yet. Tick something or view a source and it appears here.</p>
            ) : (
              <div className="rel-list">
                {recent.map((entry) => (
                  <button key={entry.key} onClick={() => openTopic(entry.nodeId)}>
                    {topicById[entry.nodeId]?.title ?? entry.nodeId}
                    <span className="legend-count">
                      {' '}
                      · {relativeDay(entry.at)} · {entry.text.length > 28 ? `${entry.text.slice(0, 26)}…` : entry.text}
                    </span>
                  </button>
                ))}
              </div>
            )}
            <button className="ghost" style={{ marginTop: 10 }} onClick={() => setView('progress')}>
              Open progress
            </button>
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
          {viewer && viewerResource ? (
            <Viewer
              target={viewer}
              resource={viewerResource}
              queue={(selectedId && resourcesByNode[selectedId]) || [viewerResource]}
              topicId={selectedId}
              checked={Boolean(
                progress[selectedId ?? viewerResource.nodeIds[0] ?? '']?.resourcesDone.includes(
                  viewerResource.id,
                ),
              )}
              trackedToday={trackTopicId ? progress[trackTopicId]?.tracked?.[toDateInput()] ?? 0 : 0}
              session={session}
              onSelect={openResource}
              onClose={() => setViewer(null)}
              onToggleUsed={() => {
                const nodeId = selectedId ?? viewerResource.nodeIds[0]
                if (nodeId) setProgress((map) => toggleResource(map, nodeId, viewerResource.id))
              }}
              onStartSession={startSession}
              onStopSession={stopSession}
              onOpenTopic={setSelectedId}
            />
          ) : (
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
          )}
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
              onToggleSubtopic={(subtopicId) =>
                setProgress((map) => toggleSubtopic(map, selected.id, subtopicId))
              }
              onView={openResource}
              activeResourceId={viewer?.resourceId ?? null}
              draft={draft}
            />
          )}
        </div>
      )}

      {view === 'library' && <Library onOpenTopic={openTopic} onView={openResource} />}
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
      {view === 'curriculum' && (
        <Curriculum
          progress={progress}
          onOpenTopic={openTopic}
          onToggle={(topicId, subtopicId) =>
            setProgress((map) => toggleSubtopic(map, topicId, subtopicId))
          }
          onToggleSubject={(id) => setProgress((map) => toggleDone(map, id))}
        />
      )}
      {view === 'progress' && (
        <Progress
          progress={progress}
          scoped={scoped}
          scopeLabel={focusLabel(focus)}
          goal={goal}
          onGoal={setGoal}
          onOpenTopic={openTopic}
          onFocusPath={(id) => {
            setFocus({ type: 'path', id })
            setView('map')
          }}
        />
      )}
    </div>
  )
}
