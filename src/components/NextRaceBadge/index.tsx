'use client';

import { useEffect, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { getNextRace, daysUntilRace, formatRaceDaySydney } from '@/utils/races';
import { useThemeAccent } from '@/hooks/useThemeAccent';

export const NextRaceBadge = () => {
  const [now, setNow] = useState<number | null>(null);
  const { isDark, accent, accentSoft } = useThemeAccent();

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 60 * 1000);
    return () => clearInterval(id);
  }, []);

  if (now === null) return null;
  const race = getNextRace(now);
  if (!race) return null;

  const days = daysUntilRace(race, now);
  const when = days <= 0 ? 'this weekend' : days === 1 ? 'tomorrow' : `in ${days} days`;

  return (
    <Flex justify='center' marginTop={{ base: '4px', md: '12px' }} marginBottom='28px'>
      <Link href='/calendar'>
        <Flex
          align='center'
          gap={2}
          paddingX='16px'
          paddingY='9px'
          rounded='full'
          fontSize='sm'
          fontWeight={600}
          backgroundColor={accentSoft}
          color={isDark ? 'white' : accent}
          borderWidth='1px'
          borderColor={accent}
          transition='transform 0.15s'
          _hover={{ transform: 'translateY(-1px)' }}
        >
          <Text as='span' fontSize='md'>
            🏁
          </Text>
          <Text as='span'>
            {race.flag} {race.name.replace(' Grand Prix', ' GP')} — {when}
          </Text>
          <Text as='span' fontWeight={500} opacity={0.7}>
            {formatRaceDaySydney(race)} AEST
          </Text>
        </Flex>
      </Link>
    </Flex>
  );
};
