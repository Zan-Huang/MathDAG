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
