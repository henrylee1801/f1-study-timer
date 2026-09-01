import { RACES_2026, Race } from '@/constants/races2026';

const SYDNEY_TZ = 'Australia/Sydney';
const DAY_MS = 24 * 60 * 60 * 1000;

const raceInstant = (race: Race): number => new Date(`${race.date}T00:00:00`).getTime();
const endOfRaceDay = (race: Race): number => raceInstant(race) + DAY_MS;

export const getNextRace = (now: number = Date.now()): Race | null =>
  RACES_2026.find((r) => endOfRaceDay(r) > now) ?? null;

export const getLastRace = (now: number = Date.now()): Race | null => {
  const past = RACES_2026.filter((r) => endOfRaceDay(r) <= now);
  return past.length ? past[past.length - 1] : null;
};

/** Whole days from `now` to the given race day (0 = today, 1 = tomorrow). */
export const daysUntilRace = (race: Race, now: number = Date.now()): number => {
  const startOfToday = new Date(new Date(now).toISOString().slice(0, 10) + 'T00:00:00').getTime();
  return Math.round((raceInstant(race) - startOfToday) / DAY_MS);
};

export const formatRaceDaySydney = (race: Race): string =>
  new Date(`${race.date}T00:00:00`).toLocaleDateString('en-AU', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: SYDNEY_TZ,
  });

export const isRacePast = (race: Race, now: number = Date.now()): boolean =>
  endOfRaceDay(race) <= now;

/** A confirmed ISO session time rendered in Australian Eastern time, else "TBC". */
export const sessionTimeAEST = (iso?: string): string => {
  if (!iso) return 'TBC';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return 'TBC';
  return d.toLocaleString('en-AU', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: SYDNEY_TZ,
  });
};

export { RACES_2026 };
export type { Race };
