export const DOMAINS = [
  'math',
  'computing',
  'physics',
  'biology',
  'compneuro',
  'ai',
  'bridge',
] as const

export type Domain = (typeof DOMAINS)[number]

export const DOMAIN_LABEL: Record<Domain, string> = {
  math: 'Mathematics',
  computing: 'Computing',
  physics: 'Physics',
  biology: 'Biology & Experimental Neuro',
  compneuro: 'Computational Neuroscience',
  ai: 'Artificial Intelligence',
  bridge: 'Overlaps & Bridges',
}

export const RESOURCE_TYPES = [
  'book',
  'lecture-notes',
  'video-course',
  'course',
  'paper',
  'interactive',
  'reference',
] as const

export type ResourceType = (typeof RESOURCE_TYPES)[number]

export const RESOURCE_TYPE_LABEL: Record<ResourceType, string> = {
  book: 'Book',
  'lecture-notes': 'Lecture notes',
  'video-course': 'Video course',
  course: 'Course',
  paper: 'Paper',
  interactive: 'Interactive',
  reference: 'Reference',
}

export type Difficulty = 'intro' | 'intermediate' | 'advanced'
export type ResourceFormat = 'web' | 'pdf' | 'video' | 'interactive'

export type ProgressStatus = 'none' | 'in_progress' | 'completed' | 'known'

export interface Topic {
  id: string
  title: string
  domains: Domain[]
  primary: Domain
  hours: number
  prerequisites: string[]
  summary: string
  ideas: string[]
  overview: string
  study: string
  unlocks: string
}

/**
 * A sub-part of a resource that can be opened on its own in the in-app viewer:
 * a lecture playlist, a chapter PDF, a notes page, a lab.
 */
export interface ResourcePart {
  title: string
  url: string
  /** URL to load in the viewer when it differs from `url` (e.g. a YouTube embed URL). */
  embed?: string
  /** false when the publisher forbids framing (X-Frame-Options / frame-ancestors). */
  embeddable?: boolean
  kind?: ResourceFormat
}

export interface Resource {
  id: string
  title: string
  authors: string
  type: ResourceType
  url: string
  format: ResourceFormat
  license: string
  description: string
  difficulty: Difficulty
  nodeIds: string[]
  /** URL to load in the viewer when it differs from `url` (playlist embed, direct PDF). */
  embed?: string
  /** false when the publisher forbids framing; the viewer then offers an external open. */
  embeddable?: boolean
  /** Lecture playlists, chapter PDFs, or notes that can be viewed individually. */
  parts?: ResourcePart[]
}

export interface Path {
  id: string
  title: string
  subtitle: string
  nodeIds: string[]
}

export interface CheckIn {
  id: string
  at: string
  minutes: number
  note: string
}

export interface NodeProgress {
  status: ProgressStatus
  notes: string
  updatedAt: string
  checkins: CheckIn[]
  resourcesDone: string[]
  ideasDone: number[]
  subtopicsDone: string[]
}

export type ProgressMap = Record<string, NodeProgress>
