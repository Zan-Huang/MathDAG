import { useMemo, useRef, useState } from 'react'
import { topicById } from '../data'
import type { Topic } from '../data/types'
import type { ProgressMap } from '../data/types'
import { availability } from '../lib/graph'
import { isDone } from '../lib/progress'
import { COL_W, NODE_H, NODE_W, PAD_X, PAD_Y, edgePath, layoutTopics } from '../lib/layout'

type Props = {
  topics: Topic[]
  progress: ProgressMap
  selectedId: string | null
  onSelect: (id: string) => void
  onToggle: (id: string) => void
  caption?: string
}

export function GraphMap({ topics, progress, selectedId, onSelect, onToggle, caption }: Props) {
  const { nodes, width, height } = useMemo(() => layoutTopics(topics), [topics])
  const byId = useMemo(() => Object.fromEntries(nodes.map((n) => [n.topic.id, n])), [nodes])
  const [view, setView] = useState({ x: 24, y: 16, k: 0.82 })
  const drag = useRef<{ x: number; y: number; vx: number; vy: number } | null>(null)
  const [dragging, setDragging] = useState(false)
  const [hoverId, setHoverId] = useState<string | null>(null)

  const focus = hoverId ?? selectedId
  const focusPres = focus ? new Set(topicById[focus]?.prerequisites ?? []) : new Set<string>()
  const focusNext = focus
    ? new Set(
        nodes
          .filter((n) => n.topic.prerequisites.includes(focus))
          .map((n) => n.topic.id),
      )
    : new Set<string>()

  const ranks = [...new Set(nodes.map((n) => n.rank))].sort((a, b) => a - b)

  return (
    <div className="stage">
      <svg
        className={`graph-svg${dragging ? ' dragging' : ''}`}
        onWheel={(e) => {
          e.preventDefault()
          const factor = e.deltaY < 0 ? 1.08 : 0.92
          const k = Math.min(2.2, Math.max(0.28, view.k * factor))
          setView((v) => ({ ...v, k }))
        }}
        onPointerDown={(e) => {
          if ((e.target as Element).closest('.node')) return
          drag.current = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y }
          setDragging(true)
          ;(e.currentTarget as SVGSVGElement).setPointerCapture(e.pointerId)
        }}
        onPointerMove={(e) => {
          if (!drag.current) return
          setView({
            x: drag.current.vx + (e.clientX - drag.current.x),
            y: drag.current.vy + (e.clientY - drag.current.y),
            k: view.k,
          })
        }}
        onPointerUp={() => {
          drag.current = null
          setDragging(false)
        }}
      >
        <g transform={`translate(${view.x} ${view.y}) scale(${view.k})`}>
          {ranks.map((rank) => (
            <text key={rank} className="rank-label" x={PAD_X + rank * COL_W} y={PAD_Y - 18}>
              Layer {rank}
            </text>
          ))}
          {nodes.flatMap((to) =>
            to.topic.prerequisites
              .map((pre) => byId[pre])
              .filter(Boolean)
              .map((from) => {
                const lit =
                  focus != null &&
                  (from.topic.id === focus ||
                    to.topic.id === focus ||
                    (focusPres.has(from.topic.id) && to.topic.id === focus) ||
                    (from.topic.id === focus && focusNext.has(to.topic.id)))
                const dim = focus != null && !lit
                return (
                  <path
                    key={`${from.topic.id}-${to.topic.id}`}
                    className={`edge${lit ? ' lit' : ''}${dim ? ' dim' : ''}`}
                    d={edgePath(from, to)}
                  />
                )
              }),
          )}
          {nodes.map((node) => {
            const state = availability(node.topic.id, progress)
            const done = isDone(progress, node.topic.id)
            const checkins = progress[node.topic.id]?.checkins?.length ?? 0
            const dim =
              focus != null &&
              node.topic.id !== focus &&
              !focusPres.has(node.topic.id) &&
              !focusNext.has(node.topic.id)
            const boxX = NODE_W - 22
            const boxY = 17
            return (
              <g
                key={node.topic.id}
                className={`node ${state}${selectedId === node.topic.id ? ' selected' : ''}${dim ? ' dim' : ''}`}
                transform={`translate(${node.x} ${node.y})`}
                onPointerEnter={() => setHoverId(node.topic.id)}
                onPointerLeave={() => setHoverId(null)}
              >
                <rect
                  className="node-body"
                  width={NODE_W}
                  height={NODE_H}
                  rx="2"
                  onClick={() => onSelect(node.topic.id)}
                />
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height={NODE_H}
                  fill={`var(--${node.topic.primary})`}
                  onClick={() => onSelect(node.topic.id)}
                />
                <text className="node-title" x="14" y="22" onClick={() => onSelect(node.topic.id)}>
                  {node.topic.title.length > 22
                    ? `${node.topic.title.slice(0, 20)}…`
                    : node.topic.title}
                </text>
                <text className="node-meta" x="14" y="40" onClick={() => onSelect(node.topic.id)}>
                  {node.topic.primary} · {node.topic.hours}h
                  {checkins > 0 ? ` · ${checkins} in` : ''}
                </text>
                <g
                  className={`node-check${done ? ' on' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    onToggle(node.topic.id)
                  }}
                >
                  <rect x={boxX} y={boxY} width="16" height="16" rx="2" />
                  {done && <path d={`M ${boxX + 3.2} ${boxY + 8.2} L ${boxX + 6.6} ${boxY + 11.6} L ${boxX + 13} ${boxY + 4.2}`} />}
                  {state === 'in_progress' && !done && (
                    <path d={`M ${boxX + 4} ${boxY + 8} H ${boxX + 12}`} />
                  )}
                </g>
              </g>
            )
          })}
          <rect width={width} height={height} fill="none" />
        </g>
      </svg>
      <div className="graph-help">
        {caption ? `${caption} · ` : ''}
        Scroll to zoom · Drag to pan · Box checks off a subject · Name opens it
      </div>
    </div>
  )
}
