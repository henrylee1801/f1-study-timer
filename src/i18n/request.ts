import { getRequestConfig } from 'next-intl/server';
import { defaultLocale } from '@/i18n/config';

// Static export: there is no request/cookie at build time. We render with the
// default locale on the server and let the client-side <IntlProvider> swap the
// active locale + messages after hydration (see src/app/intlProvider.tsx).
export default getRequestConfig(async () => {
  const locale = defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
