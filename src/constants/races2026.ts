/**
 * 2026 FIA Formula One World Championship calendar.
 *
 * Session times are LOCAL AUSTRALIAN EASTERN wall-clock (Australia/Sydney),
 * as published by f1calendar.com — stored plainly as "YYYY-MM-DDTHH:MM" and
 * displayed as-is (no timezone maths). `date` is the race day in Sydney.
 *
 * The April Bahrain & Saudi Arabia rounds were cancelled (Middle East
 * conflict); the Bahrain GP was re-staged at Sepang, Malaysia in October.
 * Season = 23 rounds. Sprint rounds: China, Miami, Canada, Great Britain,
 * Netherlands, Singapore. Verify against formula1.com before each round.
 */
export interface Race {
  round: number;
  name: string;
  circuit: string;
  country: string;
  flag: string;
  /** Race day in Australia/Sydney, "YYYY-MM-DD". */
  date: string;
  isSprint?: boolean;
  note?: string;
  /** Sydney wall-clock "YYYY-MM-DDTHH:MM". */
  qualifying?: string;
  race?: string;
  sprintQualifying?: string;
  sprint?: string;
}

// prettier-ignore
export const RACES_2026: Race[] = [
  { round: 1,  name: 'Australian Grand Prix',        circuit: 'Albert Park Circuit, Melbourne',              country: 'Australia',            flag: '🇦🇺', date: '2026-03-08', qualifying: '2026-03-07T05:00', race: '2026-03-08T04:00' },
  { round: 2,  name: 'Chinese Grand Prix',           circuit: 'Shanghai International Circuit',               country: 'China',                flag: '🇨🇳', date: '2026-03-15', isSprint: true, sprintQualifying: '2026-03-13T07:30', sprint: '2026-03-14T03:00', qualifying: '2026-03-14T07:00', race: '2026-03-15T07:00' },
  { round: 3,  name: 'Japanese Grand Prix',          circuit: 'Suzuka Circuit',                              country: 'Japan',                flag: '🇯🇵', date: '2026-03-29', qualifying: '2026-03-28T06:00', race: '2026-03-29T06:00' },
  { round: 4,  name: 'Miami Grand Prix',             circuit: 'Miami International Autodrome',                country: 'United States',        flag: '🇺🇸', date: '2026-05-03', isSprint: true, sprintQualifying: '2026-05-01T21:30', sprint: '2026-05-02T17:00', qualifying: '2026-05-02T21:00', race: '2026-05-03T18:00' },
  { round: 5,  name: 'Canadian Grand Prix',          circuit: 'Circuit Gilles Villeneuve, Montréal',         country: 'Canada',               flag: '🇨🇦', date: '2026-05-24', isSprint: true, sprintQualifying: '2026-05-22T21:30', sprint: '2026-05-23T17:00', qualifying: '2026-05-23T21:00', race: '2026-05-24T21:00' },
  { round: 6,  name: 'Monaco Grand Prix',            circuit: 'Circuit de Monaco',                           country: 'Monaco',               flag: '🇲🇨', date: '2026-06-07', qualifying: '2026-06-06T15:00', race: '2026-06-07T14:00' },
  { round: 7,  name: 'Barcelona-Catalunya Grand Prix', circuit: 'Circuit de Barcelona-Catalunya',            country: 'Spain',                flag: '🇪🇸', date: '2026-06-14', qualifying: '2026-06-13T15:00', race: '2026-06-14T14:00' },
  { round: 8,  name: 'Austrian Grand Prix',          circuit: 'Red Bull Ring, Spielberg',                    country: 'Austria',              flag: '🇦🇹', date: '2026-06-28', qualifying: '2026-06-27T15:00', race: '2026-06-28T14:00' },
  { round: 9,  name: 'British Grand Prix',           circuit: 'Silverstone Circuit',                         country: 'United Kingdom',       flag: '🇬🇧', date: '2026-07-05', isSprint: true, sprintQualifying: '2026-07-03T16:30', sprint: '2026-07-04T12:00', qualifying: '2026-07-04T16:00', race: '2026-07-05T15:00' },
  { round: 10, name: 'Belgian Grand Prix',           circuit: 'Circuit de Spa-Francorchamps',                country: 'Belgium',              flag: '🇧🇪', date: '2026-07-19', qualifying: '2026-07-18T15:00', race: '2026-07-19T14:00' },
  { round: 11, name: 'Hungarian Grand Prix',         circuit: 'Hungaroring, Budapest',                       country: 'Hungary',              flag: '🇭🇺', date: '2026-07-26', qualifying: '2026-07-25T15:00', race: '2026-07-26T14:00' },
  { round: 12, name: 'Dutch Grand Prix',             circuit: 'Circuit Zandvoort',                           country: 'Netherlands',          flag: '🇳🇱', date: '2026-08-23', isSprint: true, sprintQualifying: '2026-08-21T15:30', sprint: '2026-08-22T11:00', qualifying: '2026-08-22T15:00', race: '2026-08-23T14:00' },
  { round: 13, name: 'Italian Grand Prix',           circuit: 'Autodromo Nazionale Monza',                   country: 'Italy',                flag: '🇮🇹', date: '2026-09-06', qualifying: '2026-09-05T15:00', race: '2026-09-06T14:00' },
  { round: 14, name: 'Spanish Grand Prix',           circuit: 'Madring street circuit, Madrid',              country: 'Spain',                flag: '🇪🇸', date: '2026-09-13', note: 'New Madrid street circuit takes the Spanish GP slot', qualifying: '2026-09-12T15:00', race: '2026-09-13T14:00' },
  { round: 15, name: 'Azerbaijan Grand Prix',        circuit: 'Baku City Circuit',                           country: 'Azerbaijan',           flag: '🇦🇿', date: '2026-09-26', note: 'Saturday race', qualifying: '2026-09-25T13:00', race: '2026-09-26T12:00' },
  { round: 16, name: 'Bahrain Grand Prix',           circuit: 'Sepang International Circuit, Malaysia',       country: 'Malaysia',             flag: '🇲🇾', date: '2026-10-04', note: 'Re-staged at Sepang after the April Bahrain round was cancelled', qualifying: '2026-10-03T09:00', race: '2026-10-04T08:00' },
  { round: 17, name: 'Singapore Grand Prix',         circuit: 'Marina Bay Street Circuit',                   country: 'Singapore',            flag: '🇸🇬', date: '2026-10-11', isSprint: true, sprintQualifying: '2026-10-09T13:30', sprint: '2026-10-10T10:00', qualifying: '2026-10-10T14:00', race: '2026-10-11T13:00' },
  { round: 18, name: 'United States Grand Prix',     circuit: 'Circuit of the Americas, Austin',             country: 'United States',        flag: '🇺🇸', date: '2026-10-25', qualifying: '2026-10-24T22:00', race: '2026-10-25T20:00' },
  { round: 19, name: 'Mexico City Grand Prix',       circuit: 'Autódromo Hermanos Rodríguez',                country: 'Mexico',               flag: '🇲🇽', date: '2026-11-01', qualifying: '2026-10-31T21:00', race: '2026-11-01T20:00' },
  { round: 20, name: 'São Paulo Grand Prix',         circuit: 'Autódromo José Carlos Pace, Interlagos',      country: 'Brazil',               flag: '🇧🇷', date: '2026-11-08', qualifying: '2026-11-07T18:00', race: '2026-11-08T17:00' },
  { round: 21, name: 'Las Vegas Grand Prix',         circuit: 'Las Vegas Strip Circuit',                     country: 'United States',        flag: '🇺🇸', date: '2026-11-22', qualifying: '2026-11-21T04:00', race: '2026-11-22T04:00' },
  { round: 22, name: 'Qatar Grand Prix',             circuit: 'Lusail International Circuit',                 country: 'Qatar',                flag: '🇶🇦', date: '2026-11-29', qualifying: '2026-11-28T18:00', race: '2026-11-29T16:00' },
  { round: 23, name: 'Abu Dhabi Grand Prix',         circuit: 'Yas Marina Circuit',                          country: 'United Arab Emirates', flag: '🇦🇪', date: '2026-12-06', qualifying: '2026-12-05T14:00', race: '2026-12-06T13:00' },
];
