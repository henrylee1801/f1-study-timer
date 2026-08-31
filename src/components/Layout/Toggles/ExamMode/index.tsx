'use client';

import { IconButton } from '@chakra-ui/react';
import { LuGraduationCap } from 'react-icons/lu';
import { useEffect, useRef, useState } from 'react';
import useSettingsStore from '@/stores/Settings.store';
import { PomodoroMode } from '@/interfaces/Settings.interface';
import { useSettings } from '@/hooks/useSettings';
import { useTimerGuard } from '@/hooks/useTimerGuard';

export function ToggleExamMode() {
  const mode = useSettingsStore((state) => state.mode);
  const [mounted, setMounted] = useState(false);
  const previousMode = useRef<PomodoroMode>(PomodoroMode.F1);
  const { handleToggleMode } = useSettings();
  const { confirmInterruptIfRunning } = useTimerGuard();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mode !== PomodoroMode.EXAM) previousMode.current = mode;
  }, [mode]);

  const toggleExamMode = async () => {
    if (!(await confirmInterruptIfRunning())) return;
    await handleToggleMode(mode === PomodoroMode.EXAM ? previousMode.current : PomodoroMode.EXAM);
  };

  if (!mounted) return null;

  return (
    <IconButton
      data-pw-id={'exam-mode-switcher'}
      variant={'ghost'}
      rounded='full'
      aria-pressed={mode === PomodoroMode.EXAM}
      color={
        mode === PomodoroMode.EXAM
          ? { base: 'gray.800', _hover: 'gray.900' }
          : { base: 'gray.500', _hover: 'gray.700' }
      }
      onClick={toggleExamMode}
    >
      <LuGraduationCap />
    </IconButton>
  );
}
