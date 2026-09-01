import { ExamSection } from '@/interfaces/Settings.interface';

export interface HscSubject {
  id: string;
  name: string;
  duration: number; // minutes
  sections: Omit<ExamSection, 'id'>[];
}

/**
 * HSC Year 11 (Preliminary) practice-paper presets for Kathryn's subjects.
 * Durations/section splits follow the typical HSC paper shape and are a
 * sensible default — everything stays editable once loaded.
 */
export const HSC_SUBJECTS: HscSubject[] = [
  {
    id: 'english-adv',
    name: 'English Advanced',
    duration: 120,
    sections: [
      { name: 'Section I — Comprehension', minutes: 45 },
      { name: 'Section II — Composition', minutes: 75 },
    ],
  },
  {
    id: 'english-ext1',
    name: 'English Extension 1',
    duration: 120,
    sections: [
      { name: 'Question 1 — Short responses', minutes: 40 },
      { name: 'Question 2 — Extended response', minutes: 80 },
    ],
  },
  {
    id: 'math-adv',
    name: 'Mathematics Advanced',
    duration: 150,
    sections: [
      { name: 'Section I — Multiple choice', minutes: 20 },
      { name: 'Section II — Short answer', minutes: 130 },
    ],
  },
  {
    id: 'math-ext1',
    name: 'Mathematics Extension 1',
    duration: 120,
    sections: [
      { name: 'Section I — Multiple choice', minutes: 15 },
      { name: 'Section II — Short answer', minutes: 105 },
    ],
  },
  {
    id: 'economics',
    name: 'Economics',
    duration: 180,
    sections: [
      { name: 'Section I — Multiple choice', minutes: 20 },
      { name: 'Section II — Short answer', minutes: 60 },
      { name: 'Section III — Extended response', minutes: 45 },
      { name: 'Section IV — Essay', minutes: 55 },
    ],
  },
  {
    id: 'legal',
    name: 'Legal Studies',
    duration: 180,
    sections: [
      { name: 'Section I — Multiple choice', minutes: 20 },
      { name: 'Section II — Short answer', minutes: 55 },
      { name: 'Section III — Extended response', minutes: 50 },
      { name: 'Section IV — Essay', minutes: 55 },
    ],
  },
  {
    id: 'business',
    name: 'Business Studies',
    duration: 180,
    sections: [
      { name: 'Section I — Multiple choice', minutes: 20 },
      { name: 'Section II — Short answer', minutes: 50 },
      { name: 'Section III — Stimulus (extended)', minutes: 45 },
      { name: 'Section IV — Business report / essay', minutes: 65 },
    ],
  },
];
