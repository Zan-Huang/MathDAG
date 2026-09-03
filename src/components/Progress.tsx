import { useMemo, useState } from 'react'
import { topicById, topics as allTopics } from '../data'
import { paths } from '../data/paths'
import { DOMAIN_LABEL, DOMAINS, type ProgressMap, type Topic } from '../data/types'
import { formatDay, relativeDay, toDateInput } from '../lib/dates'
import { availability } from '../lib/graph'
import {
  MASTERY_LABEL,
  MASTERY_LEVELS,
  calendarWeeks,
  dayStats,
  masteryOf,
  nextItem,
  streaks,
  summarize,
  trailing,
  type MasteryLevel,
} from '../lib/mastery'
import { allCheckIns, allEvents } from '../lib/progress'
import { MasteryBar } from './MasteryBar'

type Props = {
  progress: ProgressMap
  scoped: Topic[]
  scopeLabel: string
  goal: number
  onGoal: (minutes: number) => void
  onOpenTopic: (id: string) => void
  onFocusPath: (id: string) => void
}

type FeedItem = {
  key: string
  at: string
  nodeId: string
  kind: 'checkin' | 'subtopic' | 'idea' | 'resource' | 'mastered' | 'view'
  label: string
  minutes?: number
}

const KIND_LABEL: Record<FeedItem['kind'], string> = {
  checkin: 'Checked in',
  subtopic: 'Curriculum item',
  idea: 'Core idea',
  resource: 'Used source',
  mastered: 'Mastered',
  view: 'Opened',
}

export function Progress({ progress, scoped, scopeLabel, goal, onGoal, onOpenTopic, onFocusPath }: Props) {
  const [showAll, setShowAll] = useState(false)
  const [goalInput, setGoalInput] = useState(String(goal))

  const stats = useMemo(() => dayStats(progress), [progress])
  const streak = useMemo(() => streaks(stats), [stats])
  const week = useMemo(() => trailing(stats, 7), [stats])
  const month = useMemo(() => trailing(stats, 30), [stats])
  const overall = useMemo(() => summarize(progress, scoped), [progress, scoped])
  const weeks = useMemo(() => calendarWeeks(26), [])
  const scopedIds = useMemo(() => new Set(scoped.map((t) => t.id)), [scoped])

  const masteries = useMemo(
    () => Object.fromEntries(scoped.map((topic) => [topic.id, masteryOf(progress, topic.id)])),
    [progress, scoped],
  )

  const continueList = scoped
    .filter((topic) => masteries[topic.id].level !== 'mastered' && masteries[topic.id].lastActive)
    .sort((a, b) => Date.parse(masteries[b.id].lastActive!) - Date.parse(masteries[a.id].lastActive!))
    .slice(0, 6)

  const upNext = scoped
    .filter(
      (topic) =>
        masteries[topic.id].level === 'none' && availability(topic.id, progress) === 'available',
    )
    .slice(0, 6)

  const readyToMaster = scoped.filter(
    (topic) => masteries[topic.id].level === 'proficient' && masteries[topic.id].pct >= 90,
  )

  const feed = useMemo<FeedItem[]>(() => {
    const items: FeedItem[] = []
    for (const entry of allCheckIns(progress)) {
      if (!scopedIds.has(entry.nodeId)) continue
      items.push({
        key: `c-${entry.nodeId}-${entry.id}`,
        at: entry.at,
        nodeId: entry.nodeId,
        kind: 'checkin',
        label: entry.note || `${entry.minutes} minute study block`,
        minutes: entry.minutes,
      })
    }
    for (const event of allEvents(progress)) {
      if (!scopedIds.has(event.nodeId)) continue
      items.push({
        key: `e-${event.nodeId}-${event.id}`,
        at: event.at,
        nodeId: event.nodeId,
        kind: event.kind,
        label: event.label,
      })
    }
    return items.sort((a, b) => Date.parse(b.at) - Date.parse(a.at))
  }, [progress, scopedIds])

  const feedShown = showAll ? feed : feed.slice(0, 40)
  const feedByDay: { day: string; items: FeedItem[] }[] = []
  for (const item of feedShown) {
    const day = toDateInput(item.at)
    const last = feedByDay[feedByDay.length - 1]
    if (last && last.day === day) last.items.push(item)
    else feedByDay.push({ day, items: [item] })
  }

  const totalMinutes = [...stats.values()].reduce((sum, s) => sum + s.minutes, 0)
  const goalPct = Math.min(100, Math.round((week.minutes / goal) * 100))
  const today = toDateInput()

  function cellLevel(day: string): number {
    const stat = stats.get(day)
    if (!stat || (stat.minutes === 0 && stat.marks === 0)) return 0
    const weight = stat.minutes + stat.marks * 5
    if (weight < 15) return 1
    if (weight < 45) return 2
    if (weight < 90) return 3
    return 4
  }

  return (
    <div className="progress-page">
      <div className="kicker">Progress · {scopeLabel}</div>
      <h2>Your progress</h2>
      <p className="hint">
        Everything here is computed from what you tick, open, and check in — there is nothing extra
        to fill out. Mastery per subject moves from Attempted to Familiar to Proficient as you work
        through its curriculum, core ideas, and sources; checking the subject off makes it Mastered.
      </p>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-label">Mastery</div>
          <div className="stat-value">{overall.pct}%</div>
          <div className="stat-sub">
            {overall.earnedHours} of {overall.hours} subject-hours · {overall.counts.mastered}/{overall.total} mastered
          </div>
          <MasteryBar pct={overall.pct} level={overall.pct >= 100 ? 'mastered' : 'proficient'} thin />
        </div>
        <div className="stat-card">
          <div className="stat-label">This week</div>
          <div className="stat-value">
            {week.minutes} <span className="stat-unit">min</span>
          </div>
          <div className="stat-sub">
            {goalPct}% of a {goal} min goal · {week.marks} items ticked · {week.activeDays} active days
          </div>
          <div className="goal-meter">
            <span style={{ width: `${goalPct}%` }} />
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Streak</div>
          <div className="stat-value">
            {streak.current} <span className="stat-unit">day{streak.current === 1 ? '' : 's'}</span>
          </div>
          <div className="stat-sub">
            Longest {streak.longest} · {stats.get(today) && (stats.get(today)!.minutes > 0 || stats.get(today)!.marks > 0) ? 'Active today' : 'Nothing logged today yet'}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">All time</div>
          <div className="stat-value">
            {totalMinutes < 600 ? (totalMinutes / 60).toFixed(1) : Math.round(totalMinutes / 60)}{' '}
            <span className="stat-unit">h</span>
          </div>
          <div className="stat-sub">
            {totalMinutes} min · {month.minutes} min in 30 days · {feed.length} logged action{feed.length === 1 ? '' : 's'}
          </div>
        </div>
      </div>

      <section className="progress-section">
        <div className="progress-head">
          <h3>Activity</h3>
          <label className="goal-edit">
            Weekly goal
            <input
              type="number"
              min={15}
              step={15}
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              onBlur={() => {
                const value = Number(goalInput)
                if (Number.isFinite(value) && value >= 15) onGoal(value)
                else setGoalInput(String(goal))
              }}
            />
            min
          </label>
        </div>
        <div className="heatmap">
          <div className="heatmap-days">
            {['Mon', '', 'Wed', '', 'Fri', '', 'Sun'].map((d, i) => (
              <span key={i}>{d}</span>
            ))}
          </div>
          <div className="heatmap-grid">
            {weeks.map((column, w) => (
              <div className="heatmap-col" key={column[0]}>
                {column.map((day) => {
                  const stat = stats.get(day)
                  const future = day > today
                  return (
                    <span
                      key={day}
                      className={`cell l${cellLevel(day)}${future ? ' future' : ''}${day === today ? ' today' : ''}`}
                      title={`${formatDay(`${day}T12:00:00`)} · ${stat?.minutes ?? 0} min · ${stat?.marks ?? 0} ticked`}
                    />
                  )
                })}
                {(w === 0 || column[0].slice(5, 7) !== weeks[w - 1][0].slice(5, 7)) && (
                  <span className="heatmap-month">
                    {new Date(`${column[0]}T12:00:00`).toLocaleDateString(undefined, { month: 'short' })}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="heatmap-legend">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((l) => (
              <span key={l} className={`cell l${l}`} />
            ))}
            <span>More</span>
          </div>
        </div>
      </section>

      <div className="progress-columns">
        <section className="progress-section">
          <h3>Continue</h3>
          {continueList.length === 0 ? (
            <p className="hint">Open a subject and tick something — it will show up here.</p>
          ) : (
            <ul className="continue-list">
              {continueList.map((topic) => {
                const m = masteries[topic.id]
                const next = nextItem(progress, topic.id)
                return (
                  <li key={topic.id}>
                    <button className="continue-title" onClick={() => onOpenTopic(topic.id)}>
                      {topic.title}
                    </button>
                    <div className="continue-meta">
                      <span className={`level-badge level-${m.level}`}>{MASTERY_LABEL[m.level]}</span>
                      <span>{m.pct}%</span>
                      <span>· {relativeDay(m.lastActive!)}</span>
                      {m.minutes > 0 && <span>· {m.minutes} min</span>}
                    </div>
                    <MasteryBar pct={m.pct} level={m.level} thin />
                    {next && <div className="continue-next">Next: {next}</div>}
                  </li>
                )
              })}
            </ul>
          )}
          {readyToMaster.length > 0 && (
            <>
              <h3 style={{ marginTop: 18 }}>Ready to check off</h3>
              <p className="hint">Nearly everything ticked. Open and check the subject off when you can do the work.</p>
              <div className="rel-list">
                {readyToMaster.map((topic) => (
                  <button key={topic.id} onClick={() => onOpenTopic(topic.id)}>
                    {topic.title} · {masteries[topic.id].pct}%
                  </button>
                ))}
              </div>
            </>
          )}
        </section>

        <section className="progress-section">
          <h3>Up next</h3>
          <p className="hint">Unlocked by what you have mastered, not yet started.</p>
          {upNext.length === 0 ? (
            <p className="hint">Nothing unlocked and untouched — keep going on Continue.</p>
          ) : (
            <ul className="upnext-list">
              {upNext.map((topic) => (
                <li key={topic.id}>
                  <button onClick={() => onOpenTopic(topic.id)}>{topic.title}</button>
                  <span className="legend-count">
                    {DOMAIN_LABEL[topic.primary]} · {topic.hours}h
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section className="progress-section">
        <h3>By field</h3>
        <div className="field-rows">
          {DOMAINS.map((domain) => {
            const list = scoped.filter((topic) => topic.domains.includes(domain))
            if (list.length === 0) return null
            const s = summarize(progress, list)
            return (
              <div className="field-row" key={domain}>
                <div className="field-name">
                  <span className="swatch" style={{ background: `var(--${domain})` }} />
                  {DOMAIN_LABEL[domain]}
                </div>
                <div className="segmented" title={`${s.pct}% mastery · ${s.counts.mastered}/${s.total} mastered`}>
                  {(['mastered', 'proficient', 'familiar', 'attempted'] as MasteryLevel[]).map((level) => (
                    <span
                      key={level}
                      className={`seg seg-${level}`}
                      style={{ width: `${(s.hoursByLevel[level] / s.hours) * 100}%` }}
                    />
                  ))}
                </div>
                <div className="field-num">
                  {s.pct}% <span className="legend-count">· {s.counts.mastered}/{s.total}</span>
                </div>
              </div>
            )
          })}
        </div>
        <div className="level-legend">
          {MASTERY_LEVELS.filter((l) => l !== 'none').map((level) => (
            <span key={level}>
              <i className={`seg seg-${level}`} /> {MASTERY_LABEL[level]}
            </span>
          ))}
        </div>
      </section>

      <section className="progress-section">
        <h3>Goals</h3>
        <div className="goal-rows">
          {paths.map((path) => {
            const list = path.nodeIds.map((id) => topicById[id]).filter(Boolean)
            const s = summarize(progress, list)
            const next = list.find((topic) => masteryOf(progress, topic.id).level !== 'mastered')
            return (
              <div className="goal-row" key={path.id}>
                <div className="goal-text">
                  <button className="goal-title" onClick={() => onFocusPath(path.id)}>
                    {path.title}
                  </button>
                  <div className="legend-count">
                    {s.counts.mastered}/{s.total} mastered · {s.pct}%
                    {next ? ` · next: ${next.title}` : ' · complete'}
                  </div>
                </div>
                <MasteryBar pct={s.pct} level={s.pct >= 100 ? 'mastered' : 'proficient'} thin />
              </div>
            )
          })}
        </div>
      </section>

      <section className="progress-section">
        <h3>Recent activity</h3>
        <p className="hint">
          Every tick, source you used, check-in, and subject you opened. Un-ticking removes the entry.
        </p>
        {feed.length === 0 ? (
          <p className="empty">Nothing yet. Open a subject, view a source, or tick a curriculum item.</p>
        ) : (
          <>
            {feedByDay.map((group) => (
              <div className="feed-day" key={group.day}>
                <div className="feed-date">
                  {relativeDay(`${group.day}T12:00:00`)}
                  <span className="legend-count">
                    {' '}
                    · {stats.get(group.day)?.minutes ?? 0} min · {group.items.length} action{group.items.length === 1 ? '' : 's'}
                  </span>
                </div>
                <ul className="feed-list">
                  {group.items.map((item) => (
                    <li key={item.key} className={`feed-${item.kind}`}>
                      <span className={`feed-kind kind-${item.kind}`}>{KIND_LABEL[item.kind]}</span>
                      <button className="feed-topic" onClick={() => onOpenTopic(item.nodeId)}>
                        {topicById[item.nodeId]?.title ?? item.nodeId}
                      </button>
                      <span className="feed-label">{item.label}</span>
                      {item.minutes !== undefined && <span className="feed-min">{item.minutes} min</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {feed.length > 40 && (
              <button className="ghost" onClick={() => setShowAll((v) => !v)}>
                {showAll ? 'Show recent only' : `Show all ${feed.length}`}
              </button>
            )}
          </>
        )}
      </section>
      {allTopics.length !== scoped.length && (
        <p className="hint">
          Showing {scopeLabel}. Switch Focus to “All subjects” in the top bar for the full picture.
        </p>
      )}
    </div>
  )
}
