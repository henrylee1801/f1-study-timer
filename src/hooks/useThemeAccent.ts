'use client';

import { useTheme } from 'next-themes';
import tinycolor from 'tinycolor2';
import useSettingsStore from '@/stores/Settings.store';
import useSessionStore from '@/stores/Session.store';

/**
 * The current F1-team accent, mirroring how the Pomodoro counter tints itself,
 * so pages (stats, calendar) sit in the same aesthetic as the timer.
 */
export const useThemeAccent = () => {
  const { resolvedTheme } = useTheme();
  const currentScuderia = useSettingsStore((s) => s.currentScuderia);
  const status = useSessionStore((s) => s.status);
  const isDark = resolvedTheme === 'dark';

  const base = isDark
    ? tinycolor(currentScuderia?.colors?.primary?.default || '#7a8cff')
    : tinycolor(currentScuderia?.colors?.background?.[status] || '#E8EDFF');

  const accent = base
    .clone()
    .darken(isDark ? 8 : 14)
    .brighten(isDark ? 0 : -18)
    .toString();

  const accentSoft = isDark
    ? tinycolor(accent).setAlpha(0.16).toRgbString()
    : tinycolor(base).lighten(4).toString();

  return { isDark, accent, accentSoft };
};
