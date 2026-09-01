/**
 * 2026 FIA Formula One World Championship calendar.
 *
 * VOLATILE DATA — the back half of the 2026 season was disrupted by the Middle
 * East conflict: the April rounds in Bahrain and Saudi Arabia were pulled, the
 * Bahrain Grand Prix was re-staged at Sepang (Malaysia) in October, and Saudi
 * Arabia dropped off entirely (season = 23 Grands Prix). Qatar / Abu Dhabi are
 * still listed but have a European contingency if they cannot host.
 * Sprint rounds for 2026: China, Miami, Canada, Great Britain, Netherlands,
 * Singapore (Belgium, Austin, Brazil and Qatar lost their sprints).
 *
 * `date` is the RACE DAY (local). `qualifying` / `race` (and the sprint
 * equivalents) are optional ISO datetimes *with offset* — fill them in as the
 * FIA confirms session times; the UI shows "TBC" until then and always also
 * renders the time in Australian Eastern time.
 * Verify against formula1.com/en/racing/2026 before each round.
 */
export interface RaceSession {
  /** ISO 8601 with timezone offset, e.g. "2026-03-08T15:00:00+11:00" */
  qualifying?: string;
  race?: string;
  sprintQualifying?: string;
  sprint?: string;
}

export interface Race extends RaceSession {
  round: number;
  name: string;
  circuit: string;
  country: string;
  flag: string;
  /** Race day, ISO local date (YYYY-MM-DD). */
  date: string;
  isSprint?: boolean;
  /** Set when the round was moved / substituted from its original slot. */
  note?: string;
}

export const RACES_2026: Race[] = [
  { round: 1, name: 'Australian Grand Prix', circuit: 'Albert Park Circuit, Melbourne', country: 'Australia', flag: '🇦🇺', date: '2026-03-08' },
  { round: 2, name: 'Chinese Grand Prix', circuit: 'Shanghai International Circuit', country: 'China', flag: '🇨🇳', date: '2026-03-15', isSprint: true },
  { round: 3, name: 'Japanese Grand Prix', circuit: 'Suzuka Circuit', country: 'Japan', flag: '🇯🇵', date: '2026-03-29' },
  { round: 4, name: 'Miami Grand Prix', circuit: 'Miami International Autodrome', country: 'United States', flag: '🇺🇸', date: '2026-05-03', isSprint: true },
  { round: 5, name: 'Canadian Grand Prix', circuit: 'Circuit Gilles Villeneuve, Montréal', country: 'Canada', flag: '🇨🇦', date: '2026-05-24', isSprint: true },
  { round: 6, name: 'Monaco Grand Prix', circuit: 'Circuit de Monaco', country: 'Monaco', flag: '🇲🇨', date: '2026-06-07' },
  { round: 7, name: 'Spanish Grand Prix', circuit: 'Circuit de Barcelona-Catalunya', country: 'Spain', flag: '🇪🇸', date: '2026-06-14' },
  { round: 8, name: 'Austrian Grand Prix', circuit: 'Red Bull Ring, Spielberg', country: 'Austria', flag: '🇦🇹', date: '2026-06-28' },
  { round: 9, name: 'British Grand Prix', circuit: 'Silverstone Circuit', country: 'United Kingdom', flag: '🇬🇧', date: '2026-07-05', isSprint: true },
  { round: 10, name: 'Belgian Grand Prix', circuit: 'Circuit de Spa-Francorchamps', country: 'Belgium', flag: '🇧🇪', date: '2026-07-19' },
  { round: 11, name: 'Hungarian Grand Prix', circuit: 'Hungaroring, Budapest', country: 'Hungary', flag: '🇭🇺', date: '2026-07-26' },
  { round: 12, name: 'Dutch Grand Prix', circuit: 'Circuit Zandvoort', country: 'Netherlands', flag: '🇳🇱', date: '2026-08-23', isSprint: true },
  { round: 13, name: 'Italian Grand Prix', circuit: 'Autodromo Nazionale Monza', country: 'Italy', flag: '🇮🇹', date: '2026-09-06' },
  { round: 14, name: 'Madrid Grand Prix', circuit: 'Madring street circuit, Madrid', country: 'Spain', flag: '🇪🇸', date: '2026-09-13', note: 'New Madrid street circuit takes the Spanish GP slot' },
  { round: 15, name: 'Azerbaijan Grand Prix', circuit: 'Baku City Circuit', country: 'Azerbaijan', flag: '🇦🇿', date: '2026-09-27' },
  { round: 16, name: 'Bahrain Grand Prix', circuit: 'Sepang International Circuit, Malaysia', country: 'Malaysia', flag: '🇲🇾', date: '2026-10-04', note: 'Re-staged at Sepang after the April Bahrain round was cancelled' },
  { round: 17, name: 'Singapore Grand Prix', circuit: 'Marina Bay Street Circuit', country: 'Singapore', flag: '🇸🇬', date: '2026-10-11', isSprint: true },
  { round: 18, name: 'United States Grand Prix', circuit: 'Circuit of the Americas, Austin', country: 'United States', flag: '🇺🇸', date: '2026-10-25' },
  { round: 19, name: 'Mexico City Grand Prix', circuit: 'Autódromo Hermanos Rodríguez', country: 'Mexico', flag: '🇲🇽', date: '2026-11-01' },
  { round: 20, name: 'São Paulo Grand Prix', circuit: 'Autódromo José Carlos Pace, Interlagos', country: 'Brazil', flag: '🇧🇷', date: '2026-11-08' },
  { round: 21, name: 'Las Vegas Grand Prix', circuit: 'Las Vegas Strip Circuit', country: 'United States', flag: '🇺🇸', date: '2026-11-21' },
  { round: 22, name: 'Qatar Grand Prix', circuit: 'Lusail International Circuit', country: 'Qatar', flag: '🇶🇦', date: '2026-11-29' },
  { round: 23, name: 'Abu Dhabi Grand Prix', circuit: 'Yas Marina Circuit', country: 'United Arab Emirates', flag: '🇦🇪', date: '2026-12-06' },
];
