import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Learn Formula 1',
  description: 'A beginner-friendly guide to how Formula 1 works.',
  icons: './favicon.ico',
  keywords:
    'formula 1, f1, f1 for beginners, learn f1, how f1 works, f1 rules, f1 points system, f1 tire compounds, f1 pit stops, f1 race weekend, f1 championship, f1 teams, f1 glossary, f1 terms',
};

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
