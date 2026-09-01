import { RACES_2026, Race } from '@/constants/races2026';

const SYDNEY_TZ = 'Australia/Sydney';

/** Milliseconds at the start (00:00) of a race day, interpreted in Sydney time. */
const raceInstant = (race: Race): number => {
  // Treat the ISO date as midnight in Sydney. Good enough for a day countdown.
  return new Date(`${race.date}T00:00:00`).getTime();
};

export const getNextRace = (now: number = Date.now()): Race | null => {
  // A race "counts" until the end of its race day.
  const endOfRaceDay = (r: Race) => raceInstant(r) + 24 * 60 * 60 * 1000;
  return RACES_2026.find((r) => endOfRaceDay(r) > now) ?? null;
};

export const getLastRace = (now: number = Date.now()): Race | null => {
  const past = RACES_2026.filter((r) => raceInstant(r) + 24 * 60 * 60 * 1000 <= now);
  return past.length ? past[past.length - 1] : null;
};

/** Whole days from `now` until the given race day (0 = today, 1 = tomorrow). */
export const daysUntilRace = (race: Race, now: number = Date.now()): number => {
  const startOfToday = new Date(new Date(now).toISOString().slice(0, 10) + 'T00:00:00').getTime();
  const raceDay = new Date(`${race.date}T00:00:00`).getTime();
  return Math.round((raceDay - startOfToday) / (24 * 60 * 60 * 1000));
};

export const formatRaceDaySydney = (race: Race): string =>
  new Date(`${race.date}T00:00:00`).toLocaleDateString('en-AU', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: SYDNEY_TZ,
  });

export const isRacePast = (race: Race, now: number = Date.now()): boolean =>
  raceInstant(race) + 24 * 60 * 60 * 1000 <= now;
