/**
 * 2026 FIA Formula One World Championship calendar.
 *
 * `date` is the RACE DAY (Sunday) in ISO form. Weekend dates from the official
 * schedule; the exact lights-out time is not encoded — the countdown works in
 * whole days. If a date shifts, just edit it here.
 * Source: formula1.com/en/racing/2026 (verify before each season).
 */
export interface Race {
  round: number;
  name: string;
  circuit: string;
  country: string;
  flag: string;
  /** Race day, ISO (local date). */
  date: string;
  sprint?: boolean;
}

export const RACES_2026: Race[] = [
  { round: 1, name: 'Australian Grand Prix', circuit: 'Albert Park, Melbourne', country: 'Australia', flag: '🇦🇺', date: '2026-03-08' },
  { round: 2, name: 'Chinese Grand Prix', circuit: 'Shanghai International Circuit', country: 'China', flag: '🇨🇳', date: '2026-03-15', sprint: true },
  { round: 3, name: 'Japanese Grand Prix', circuit: 'Suzuka Circuit', country: 'Japan', flag: '🇯🇵', date: '2026-03-29' },
  { round: 4, name: 'Bahrain Grand Prix', circuit: 'Bahrain International Circuit, Sakhir', country: 'Bahrain', flag: '🇧🇭', date: '2026-04-12' },
  { round: 5, name: 'Saudi Arabian Grand Prix', circuit: 'Jeddah Corniche Circuit', country: 'Saudi Arabia', flag: '🇸🇦', date: '2026-04-19' },
  { round: 6, name: 'Miami Grand Prix', circuit: 'Miami International Autodrome', country: 'United States', flag: '🇺🇸', date: '2026-05-03', sprint: true },
  { round: 7, name: 'Canadian Grand Prix', circuit: 'Circuit Gilles Villeneuve, Montreal', country: 'Canada', flag: '🇨🇦', date: '2026-05-24', sprint: true },
  { round: 8, name: 'Monaco Grand Prix', circuit: 'Circuit de Monaco', country: 'Monaco', flag: '🇲🇨', date: '2026-06-07' },
  { round: 9, name: 'Spanish Grand Prix', circuit: 'Circuit de Barcelona-Catalunya', country: 'Spain', flag: '🇪🇸', date: '2026-06-14' },
  { round: 10, name: 'Austrian Grand Prix', circuit: 'Red Bull Ring, Spielberg', country: 'Austria', flag: '🇦🇹', date: '2026-06-28' },
  { round: 11, name: 'British Grand Prix', circuit: 'Silverstone Circuit', country: 'United Kingdom', flag: '🇬🇧', date: '2026-07-05', sprint: true },
  { round: 12, name: 'Belgian Grand Prix', circuit: 'Circuit de Spa-Francorchamps', country: 'Belgium', flag: '🇧🇪', date: '2026-07-19' },
  { round: 13, name: 'Hungarian Grand Prix', circuit: 'Hungaroring, Budapest', country: 'Hungary', flag: '🇭🇺', date: '2026-07-26' },
  { round: 14, name: 'Dutch Grand Prix', circuit: 'Circuit Zandvoort', country: 'Netherlands', flag: '🇳🇱', date: '2026-08-23' },
  { round: 15, name: 'Italian Grand Prix', circuit: 'Autodromo Nazionale Monza', country: 'Italy', flag: '🇮🇹', date: '2026-09-06' },
  { round: 16, name: 'Madrid Grand Prix', circuit: 'Madring, Madrid', country: 'Spain', flag: '🇪🇸', date: '2026-09-13' },
  { round: 17, name: 'Azerbaijan Grand Prix', circuit: 'Baku City Circuit', country: 'Azerbaijan', flag: '🇦🇿', date: '2026-09-27' },
  { round: 18, name: 'Singapore Grand Prix', circuit: 'Marina Bay Street Circuit', country: 'Singapore', flag: '🇸🇬', date: '2026-10-11' },
  { round: 19, name: 'United States Grand Prix', circuit: 'Circuit of the Americas, Austin', country: 'United States', flag: '🇺🇸', date: '2026-10-25', sprint: true },
  { round: 20, name: 'Mexico City Grand Prix', circuit: 'Autódromo Hermanos Rodríguez', country: 'Mexico', flag: '🇲🇽', date: '2026-11-01' },
  { round: 21, name: 'São Paulo Grand Prix', circuit: 'Autódromo José Carlos Pace, Interlagos', country: 'Brazil', flag: '🇧🇷', date: '2026-11-08', sprint: true },
  { round: 22, name: 'Las Vegas Grand Prix', circuit: 'Las Vegas Strip Circuit', country: 'United States', flag: '🇺🇸', date: '2026-11-21' },
  { round: 23, name: 'Qatar Grand Prix', circuit: 'Lusail International Circuit', country: 'Qatar', flag: '🇶🇦', date: '2026-11-29', sprint: true },
  { round: 24, name: 'Abu Dhabi Grand Prix', circuit: 'Yas Marina Circuit', country: 'United Arab Emirates', flag: '🇦🇪', date: '2026-12-06' },
];
