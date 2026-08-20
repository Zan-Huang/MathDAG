import type { ReactNode } from 'react'

type Props = {
  checked: boolean
  partial?: boolean
  label?: ReactNode
  title?: string
  onChange: () => void
}

export function Check({ checked, partial, label, title, onChange }: Props) {
  return (
    <button
      type="button"
      className={`check${checked ? ' on' : ''}${partial && !checked ? ' partial' : ''}`}
      onClick={(e) => {
        e.stopPropagation()
        onChange()
      }}
      aria-pressed={checked}
      title={title}
    >
      <span className="check-box" aria-hidden>
        {checked ? (
          <svg viewBox="0 0 12 12">
            <path d="M2.2 6.2 L5 9 L10 3.2" />
          </svg>
        ) : partial ? (
          <svg viewBox="0 0 12 12">
            <path d="M2.5 6 H9.5" />
          </svg>
        ) : null}
      </span>
      {label != null && <span className="check-label">{label}</span>}
    </button>
  )
}
