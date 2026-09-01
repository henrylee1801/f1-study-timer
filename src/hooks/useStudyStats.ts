'use client';

import { useMemo } from 'react';
import { useStudyStore, StudySession } from '@/stores/Study.store';

const DAY_MS = 24 * 60 * 60 * 1000;

const dayKey = (ms: number) => {
  const d = new Date(ms);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export interface DayBucket {
  key: string;
  label: string; // e.g. "Mon 3"
  minutes: number;
  sessions: number;
}

export const useRecordSession = () => {
  const addSession = useStudyStore((s) => s.addSession);
  return (input: { minutes: number; kind: StudySession['kind']; label?: string }) => {
    if (!input.minutes || input.minutes < 1) return;
    addSession({ ...input, at: Date.now(), minutes: Math.round(input.minutes) });
  };
};

export const useStudyStats = () => {
  const sessions = useStudyStore((s) => s.sessions);

  return useMemo(() => {
    const now = Date.now();
    const todayKey = dayKey(now);
    const weekAgo = now - 7 * DAY_MS;

    const totalMinutes = sessions.reduce((sum, s) => sum + s.minutes, 0);
    const todayMinutes = sessions
      .filter((s) => dayKey(s.at) === todayKey)
      .reduce((sum, s) => sum + s.minutes, 0);
    const weekMinutes = sessions
      .filter((s) => s.at >= weekAgo)
      .reduce((sum, s) => sum + s.minutes, 0);

    // Last 14 days, oldest -> newest
    const days: DayBucket[] = [];
    for (let i = 13; i >= 0; i -= 1) {
      const d = new Date(now - i * DAY_MS);
      const key = dayKey(d.getTime());
      const forDay = sessions.filter((s) => dayKey(s.at) === key);
      days.push({
        key,
        label: d.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric' }),
        minutes: forDay.reduce((sum, s) => sum + s.minutes, 0),
        sessions: forDay.length,
      });
    }

    // Streak: consecutive days (ending today or yesterday) with >= 1 session
    const activeDays = new Set(sessions.map((s) => dayKey(s.at)));
    let streak = 0;
    const cursor = new Date(now);
    if (!activeDays.has(dayKey(cursor.getTime()))) cursor.setDate(cursor.getDate() - 1); // grace for "not yet today"
    while (activeDays.has(dayKey(cursor.getTime()))) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }

    const recent = [...sessions].sort((a, b) => b.at - a.at).slice(0, 40);

    return {
      totalSessions: sessions.length,
      totalMinutes,
      todayMinutes,
      weekMinutes,
      streak,
      days,
      maxDayMinutes: Math.max(1, ...days.map((d) => d.minutes)),
      recent,
    };
  }, [sessions]);
};
