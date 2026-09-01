import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface StudySession {
  id: string;
  /** epoch ms when the session finished */
  at: number;
  /** minutes of focused work */
  minutes: number;
  kind: 'study' | 'exam';
  /** optional label: subject for exams, task title for study */
  label?: string;
}

interface StudyStore {
  sessions: StudySession[];
  addSession: (s: Omit<StudySession, 'id'>) => void;
  clearSessions: () => void;
  importSessions: (sessions: StudySession[]) => void;
}

export const useStudyStore = create<StudyStore>()(
  persist(
    (set) => ({
      sessions: [],
      addSession: (s) =>
        set((state) => ({
          sessions: [
            ...state.sessions,
            { ...s, id: `${s.at}-${Math.random().toString(36).slice(2, 8)}` },
          ].slice(-2000),
        })),
      clearSessions: () => set({ sessions: [] }),
      importSessions: (sessions) => set({ sessions }),
    }),
    {
      name: 'kfst_study_history',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
