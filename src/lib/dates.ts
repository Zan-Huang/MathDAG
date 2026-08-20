export function formatDay(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function formatDayTime(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function relativeDay(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  const then = new Date(date)
  then.setHours(0, 0, 0, 0)
  const days = Math.round((start.getTime() - then.getTime()) / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days > 1 && days < 14) return `${days} days ago`
  return formatDay(iso)
}

export function toDateInput(iso = new Date().toISOString()): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export function fromDateInput(value: string): string {
  if (!value) return new Date().toISOString()
  const date = new Date(`${value}T12:00:00`)
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString()
}
