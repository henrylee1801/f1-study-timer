'use client';

import { NextIntlClientProvider } from 'next-intl';
import { ReactNode, useEffect, useState } from 'react';
import useSettingsStore from '@/stores/Settings.store';
import { defaultLocale } from '@/i18n/config';
import enMessages from '../../messages/en.json';
import esMessages from '../../messages/es.json';

// en.json is the source of truth; es.json may lag on a few keys (next-intl
// falls back to the key path for anything missing).
const MESSAGES: Record<string, Record<string, unknown>> = {
  en: enMessages,
  es: esMessages,
};

/**
 * Static-export replacement for next-intl's server-driven locale detection.
 * The server renders with the default locale; after hydration we switch to the
 * locale persisted in the settings store (localStorage).
 */
export function IntlProvider({ children }: { children: ReactNode }) {
  const storeLocale = useSettingsStore((state) => state.locale);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  const locale = hydrated && storeLocale in MESSAGES ? storeLocale : defaultLocale;
  const messages = MESSAGES[locale] ?? MESSAGES[defaultLocale];

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone='UTC'>
      {children}
    </NextIntlClientProvider>
  );
}
