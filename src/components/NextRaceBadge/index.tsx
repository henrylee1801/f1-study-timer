'use client';

import { useEffect, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { getNextRace, daysUntilRace, formatRaceDaySydney } from '@/utils/races';

export const NextRaceBadge = () => {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 60 * 1000);
    return () => clearInterval(id);
  }, []);

  if (now === null) return null;
  const race = getNextRace(now);
  if (!race) return null;

  const days = daysUntilRace(race, now);
  const when = days === 0 ? 'today' : days === 1 ? 'tomorrow' : `in ${days} days`;

  return (
    <Flex justify='center' marginTop={{ base: '4px', md: '10px' }} marginBottom='24px'>
      <Link href='/calendar'>
        <Flex
          align='center'
          gap={2}
          paddingX='14px'
          paddingY='7px'
          rounded='full'
          fontSize='sm'
          fontWeight={500}
          backgroundColor={{ base: 'gray.100', _dark: 'dark.200' }}
          color={{ base: 'gray.600', _dark: 'gray.300' }}
          transition='background-color 0.15s'
          _hover={{ backgroundColor: { base: 'gray.200', _dark: 'dark.100' } }}
        >
          <Text as='span' fontSize='md'>
            🏁
          </Text>
          <Text as='span'>
            Next race: {race.flag} {race.name.replace(' Grand Prix', ' GP')} — {when}
          </Text>
          <Text as='span' color={{ base: 'gray.400', _dark: 'gray.500' }}>
            ({formatRaceDaySydney(race)} AEST)
          </Text>
        </Flex>
      </Link>
    </Flex>
  );
};
