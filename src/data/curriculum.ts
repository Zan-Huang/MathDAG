import { computingCurriculum } from './computing-curriculum'
import { mathCurriculum, type Subtopic } from './math-curriculum'
import { physicsCurriculum } from './physics-curriculum'

export type { Subtopic }

export const CURRICULUM_TRACKS = ['math', 'physics', 'computing'] as const
export type CurriculumTrack = (typeof CURRICULUM_TRACKS)[number]

export const CURRICULUM_TRACK_LABEL: Record<CurriculumTrack, string> = {
  math: 'Mathematics',
  physics: 'Physics',
  computing: 'Computing',
}

export const curricula: Record<CurriculumTrack, Record<string, Subtopic[]>> = {
  math: mathCurriculum,
  physics: physicsCurriculum,
  computing: computingCurriculum,
}

const merged: Record<string, Subtopic[]> = {
  ...mathCurriculum,
  ...physicsCurriculum,
  ...computingCurriculum,
}

export function subtopicsFor(topicId: string): Subtopic[] {
  return merged[topicId] ?? []
}

export function trackForTopic(topicId: string): CurriculumTrack | null {
  if (topicId in mathCurriculum) return 'math'
  if (topicId in physicsCurriculum) return 'physics'
  if (topicId in computingCurriculum) return 'computing'
  return null
}
