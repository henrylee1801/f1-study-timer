import { useTranslations } from 'use-intl';

export const useSeo = () => {
  const t = useTranslations('meta');

  const baseUrl = 'https://henrylee1801.github.io/f1-study-timer';

  return {
    title: t('title'),
    description: t('description'),
    canonical: baseUrl,
    openGraph: {
      url: baseUrl,
      title: t('ogTitle'),
      description: t('ogDescription'),
      site_name: 'Kathryn’s F1 Study Time',
      images: [
        {
          url: `${baseUrl}/images/cover.png`,
          width: 1200,
          height: 630,
          alt: 'Kathryn’s F1 Study Time',
        },
      ],
    },
    twitter: {
      cardType: 'summary_large_image',
    },
  };
};
