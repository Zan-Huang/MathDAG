import type { MasteryLevel } from '../lib/mastery'

type Props = {
  pct: number
  level: MasteryLevel
  thin?: boolean
  title?: string
}

/** Horizontal mastery bar whose colour follows the level. */
export function MasteryBar({ pct, level, thin, title }: Props) {
  return (
    <div className={`mastery-bar level-${level}${thin ? ' thin' : ''}`} title={title}>
      <span style={{ width: `${Math.max(0, Math.min(100, pct))}%` }} />
    </div>
  )
}
