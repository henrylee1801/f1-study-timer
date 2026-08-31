import React from 'react';
import { WrapSections } from '@/components/Layout/WrapSections';
import { MainContainer } from '@/components/Layout/MainContainer';
import { Metadata } from 'next';
import { keywords } from '@/constants/Keywords';

export const metadata: Metadata = {
  title: 'F1 Study Timer',
  description: 'An F1-themed focus timer with switchable Study (Pomodoro) and Exam (countdown) modes.',
  icons: './favicon.ico',
  openGraph: {
    title: 'F1 Study Timer',
    description:
      'An F1-themed focus timer with switchable Study (Pomodoro) and Exam (countdown) modes.',
    siteName: 'F1 Study Timer',
    type: 'website',
  },
  keywords: keywords,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Pomodoro Timer — Pit My Doro',
            description:
              'Open source Pomodoro timer. Organize your time with sessions personalized for you.',
            applicationCategory: 'ProductivityApplication',
            operatingSystem: 'Web',
            url: 'https://www.pitmydoro.com',
          }),
        }}
      />

      <MainContainer>{children}</MainContainer>
      <WrapSections />
    </>
  );
}
