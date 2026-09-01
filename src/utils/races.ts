import { RACES_2026, Race } from '@/constants/races2026';

const DAY_MS = 24 * 60 * 60 * 1000;
const SYDNEY = 'Australia/Sydney';
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** Best available instant for a round: the GP start, else midnight of its date. */
const raceInstant = (race: Race): number =>
  new Date(race.race ?? `${race.date}T04:00:00Z`).getTime();

export const getNextRace = (now: number = Date.now()): Race | null =>
  RACES_2026.find((r) => raceInstant(r) + 3 * 60 * 60 * 1000 > now) ?? null;

export const getLastRace = (now: number = Date.now()): Race | null => {
  const past = RACES_2026.filter((r) => raceInstant(r) + 3 * 60 * 60 * 1000 <= now);
  return past.length ? past[past.length - 1] : null;
};

/** Whole days from now to the race, counted on the Sydney calendar. */
export const daysUntilRace = (race: Race, now: number = Date.now()): number => {
  const sydDay = (ms: number) =>
    new Intl.DateTimeFormat('en-CA', { timeZone: SYDNEY, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(ms));
  const a = new Date(`${sydDay(now)}T00:00:00Z`).getTime();
  const b = new Date(`${race.date}T00:00:00Z`).getTime();
  return Math.round((b - a) / DAY_MS);
};

export const isRacePast = (race: Race, now: number = Date.now()): boolean =>
  raceInstant(race) + 3 * 60 * 60 * 1000 <= now;

/** "Sun 8 Mar" from a Sydney "YYYY-MM-DD" date. */
export const formatRaceDay = (dateStr: string): string => {
  const [y, m, d] = dateStr.split('-').map(Number);
  const wd = WEEKDAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
  return `${wd} ${d} ${MONTHS[m - 1]}`;
};

/** A UTC instant rendered in Australian Eastern time, e.g. "Sun 8 Mar, 3:00 pm". */
export const formatSessionTime = (iso?: string): string => {
  if (!iso) return 'TBC';
  const dt = new Date(iso);
  if (Number.isNaN(dt.getTime())) return 'TBC';
  const parts = new Intl.DateTimeFormat('en-AU', {
    timeZone: SYDNEY,
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).formatToParts(dt);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  return `${get('weekday')} ${get('day')} ${get('month')}, ${get('hour')}:${get('minute')} ${get('dayPeriod').toLowerCase()}`;
};

export { RACES_2026 };
export type { Race };
