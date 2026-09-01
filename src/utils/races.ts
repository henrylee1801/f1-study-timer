import { RACES_2026, Race } from '@/constants/races2026';

const DAY_MS = 24 * 60 * 60 * 1000;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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

export const isRacePast = (race: Race, now: number = Date.now()): boolean =>
  endOfRaceDay(race) <= now;

/** "Sun 8 Mar" from a "YYYY-MM-DD" date, no timezone maths. */
export const formatRaceDay = (dateStr: string): string => {
  const [y, m, d] = dateStr.split('-').map(Number);
  const wd = WEEKDAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
  return `${wd} ${d} ${MONTHS[m - 1]}`;
};

/** "Sun 8 Mar, 4:00 am" from a "YYYY-MM-DDTHH:MM" Sydney wall-clock, else "TBC". */
export const formatSessionTime = (wallClock?: string): string => {
  if (!wallClock) return 'TBC';
  const [datePart, timePart] = wallClock.split('T');
  if (!datePart || !timePart) return 'TBC';
  const [y, m, d] = datePart.split('-').map(Number);
  const [hh, mm] = timePart.split(':').map(Number);
  const wd = WEEKDAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
  const ampm = hh < 12 ? 'am' : 'pm';
  const h12 = ((hh + 11) % 12) + 1;
  return `${wd} ${d} ${MONTHS[m - 1]}, ${h12}:${String(mm).padStart(2, '0')} ${ampm}`;
};

export { RACES_2026 };
export type { Race };
