import ChakraUIProvider from './chakraUIProvider';
import React from 'react';
import './globals.css';
import { ColorModeProvider } from '@/components/ui/color-mode';
import { IntlProvider } from './intlProvider';
import { Metadata } from 'next';
import Head from 'next/head';
import { AuthProvider } from '@/contexts/AuthContext';
import { keywords } from '@/constants/Keywords';
import { DialogProvider } from '@/contexts/DialogContext';
import { DrawerProvider } from '@/contexts/DrawerContext';
import { OverlaySync } from '@/components/StreamOverlay/OverlaySync';

export const metadata: Metadata = {
  title: 'F1 Study Timer',
  icons: './favicon.ico',
  alternates: {
    canonical: 'https://henrylee1801.github.io/f1-study-timer',
    languages: {
      'en-US': 'https://henrylee1801.github.io/f1-study-timer',
      'de-DE': 'https://henrylee1801.github.io/f1-study-timer',
    },
  },
  keywords: keywords,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={'en'} suppressHydrationWarning>
      <Head>
        <meta property='og:title' content='F1 Study Timer' />
        <meta property='og:description' content='An online F1 style Pomodoro timer.' />
        <meta property='og:url' content='https://henrylee1801.github.io/f1-study-timer/' />
        <meta property='og:type' content='website' />
        <meta property='og:image' content='https://henrylee1801.github.io/f1-study-timer/images/cover.png' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='F1 Study Timer' />
        <meta name='twitter:description' content='An online F1 style Pomodoro timer.' />
        <meta name='twitter:image' content='https://henrylee1801.github.io/f1-study-timer/images/cover.png' />
      </Head>

      <body>
        <IntlProvider>
          <ChakraUIProvider>
            <AuthProvider>
              <DialogProvider>
                <DrawerProvider>
                  <ColorModeProvider enableSystem={false}>
                    <OverlaySync />
                    <div className='app-zoom'>{children}</div>
                  </ColorModeProvider>
                </DrawerProvider>
              </DialogProvider>
            </AuthProvider>
          </ChakraUIProvider>
        </IntlProvider>
      </body>
    </html>
  );
}
