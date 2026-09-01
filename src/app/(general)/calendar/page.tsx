'use client';

import { useEffect, useState } from 'react';
import { Box, Container, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { RACES_2026 } from '@/constants/races2026';
import { getNextRace, daysUntilRace, formatRaceDaySydney, isRacePast } from '@/utils/races';

export default function CalendarPage() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => setNow(Date.now()), []);

  const next = now !== null ? getNextRace(now) : null;

  return (
    <Container maxW='640px' minHeight='80vh' paddingY={{ base: 6, md: 10 }}>
      <Heading size='xl' marginBottom='4px'>
        2026 F1 Calendar
      </Heading>
      <Text color={{ base: 'gray.500', _dark: 'gray.400' }} fontSize='sm' marginBottom='24px'>
        {now !== null && next
          ? `Next up: ${next.flag} ${next.name} — ${
              daysUntilRace(next, now) === 0
                ? 'today'
                : daysUntilRace(next, now) === 1
                  ? 'tomorrow'
                  : `in ${daysUntilRace(next, now)} days`
            }. All dates shown in Australian Eastern time.`
          : 'All dates shown in Australian Eastern time.'}
      </Text>

      <VStack align='stretch' gap={2}>
        {RACES_2026.map((race) => {
          const past = now !== null && isRacePast(race, now);
          const isNext = next?.round === race.round;
          return (
            <Flex
              key={race.round}
              align='center'
              gap={3}
              paddingX='16px'
              paddingY='12px'
              rounded='xl'
              borderWidth='1px'
              borderColor={
                isNext
                  ? { base: 'red.400', _dark: 'red.400' }
                  : { base: 'gray.200', _dark: 'dark.100' }
              }
              backgroundColor={
                isNext
                  ? { base: 'red.50', _dark: 'rgba(255,80,80,0.08)' }
                  : { base: 'white', _dark: 'dark.200' }
              }
              opacity={past ? 0.45 : 1}
            >
              <Text fontSize='xs' fontWeight={700} color={{ base: 'gray.400', _dark: 'gray.500' }} w='24px'>
                R{race.round}
              </Text>
              <Text fontSize='xl'>{race.flag}</Text>
              <Box flex={1} minW={0}>
                <Text fontWeight={600} fontSize='sm' lineClamp={1}>
                  {race.name}
                  {race.sprint && (
                    <Text
                      as='span'
                      marginLeft={2}
                      fontSize='2xs'
                      fontWeight={700}
                      color='red.500'
                      letterSpacing='wide'
                    >
                      SPRINT
                    </Text>
                  )}
                </Text>
                <Text fontSize='xs' color={{ base: 'gray.500', _dark: 'gray.400' }} lineClamp={1}>
                  {race.circuit}
                </Text>
              </Box>
              <Text fontSize='xs' fontWeight={600} color={{ base: 'gray.600', _dark: 'gray.300' }} whiteSpace='nowrap'>
                {formatRaceDaySydney(race)}
              </Text>
            </Flex>
          );
        })}
      </VStack>

      <Text fontSize='xs' color={{ base: 'gray.400', _dark: 'gray.600' }} marginTop='20px'>
        Weekend dates from the official F1 schedule. Edit{' '}
        <Text as='code' fontSize='xs'>
          src/constants/races2026.ts
        </Text>{' '}
        if anything shifts.
      </Text>
    </Container>
  );
}
