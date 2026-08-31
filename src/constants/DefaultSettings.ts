import { TireTypeEnum } from '@/enums/TireType.enum';
import { SessionStatusEnum } from '@/enums/SessionStatus.enum';
import { PomodoroMode, Settings } from '@/interfaces/Settings.interface';
import { defaultLocale } from '@/i18n/config';
import { SCUDERIAS } from '@/constants/Scuderias';

export const DefaultSettings: Settings = {
  locale: defaultLocale,
  mode: PomodoroMode.F1,
  currentScuderia: SCUDERIAS[0],
  breaksInterval: 4,
  isLongBreakPerTask: false,
  breaksDuration: {
    [SessionStatusEnum.SHORT_BREAK]: 5,
    [SessionStatusEnum.LONG_BREAK]: 15,
  },
  autoStartSession: true,
  autoStartBreak: true,
  tiresSettings: {
    [TireTypeEnum.SOFT]: {
      compound: 'Soft',
      duration: 15,
    },
    [TireTypeEnum.MEDIUM]: {
      compound: 'Medium',
      duration: 20,
    },
    [TireTypeEnum.HARD]: {
      compound: 'Hard',
      duration: 25,
    },
    [TireTypeEnum.INTERMEDIATE]: {
      compound: 'Intermediate',
      duration: 30,
    },
    [TireTypeEnum.WET]: {
      compound: 'Wet',
      duration: 35,
    },
  },
  autoCompleteTask: true,
  autoOrderTasks: true,
  autoStartNextTask: true,
  enableSounds: true,
  volume: 1,
  enableNotifications: true,
  minimalSessionDuration: 25,
  exam: {
    duration: 120,
    sections: [
      { id: 'section-1', name: 'Section A', minutes: 60 },
      { id: 'section-2', name: 'Section B', minutes: 60 },
    ],
    warnings: [30, 15, 5, 1],
  },
};

export const MAX_DURATION = 120;
export const MAX_EXAM_DURATION = 360;
