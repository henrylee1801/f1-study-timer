'use client';

import { useEffect, useState } from 'react';
import { Box, Center, Container, Flex, Text } from '@chakra-ui/react';
import { LuChevronDown } from 'react-icons/lu';
import { jersey15 } from '@/assets/fonts/Jersey';
import { RACES_2026 } from '@/constants/races2026';
import type { Race } from '@/constants/races2026';
import {
  getNextRace,
  daysUntilRace,
  formatRaceDaySydney,
  isRacePast,
  sessionTimeAEST,
} from '@/utils/races';
import { useThemeAccent } from '@/hooks/useThemeAccent';

const countdownLabel = (race: Race, now: number) => {
  const d = daysUntilRace(race, now);
  return d <= 0 ? 'this weekend' : d === 1 ? 'tomorrow' : `in ${d} days`;
};

const SessionRow = ({ label, value }: { label: string; value: string }) => (
  <Flex justify='space-between' fontSize='sm' paddingY='4px'>
    <Text color={{ base: 'gray.500', _dark: 'gray.400' }}>{label}</Text>
    <Text fontWeight={600} fontVariantNumeric='tabular-nums'>
      {value}
    </Text>
  </Flex>
);

export default function CalendarPage() {
  const [now, setNow] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const { accent, accentSoft } = useThemeAccent();

  useEffect(() => setNow(Date.now()), []);
  const next = now !== null ? getNextRace(now) : null;

  return (
    <Container maxW='620px' minHeight='80vh' paddingY={{ base: 6, md: 12 }} animation='fadeSlideUp 0.5s ease-out'>
      <Box
        rounded='3xl'
        padding={{ base: '26px 18px', md: '34px 32px' }}
        backgroundColor={{ base: 'gray.50', _dark: 'dark.200' }}
        boxShadow={{ base: 'none', md: 'md' }}
      >
        <Text className={jersey15.className} fontSize={{ base: '4xl', md: '5xl' }} lineHeight='1' color={{ base: 'gray.800', _dark: 'white' }}>
          2026 F1 Calendar
        </Text>
        <Text color={{ base: 'gray.500', _dark: 'gray.400' }} fontSize='sm' marginTop='8px' marginBottom='22px'>
          {now !== null && next ? (
            <>
              Next up: {next.flag} <b>{next.name.replace(' Grand Prix', ' GP')}</b> {countdownLabel(next, now)}. Tap a
              round for session times — all shown in Australian Eastern time.
            </>
          ) : (
            'Tap a round for session times — all shown in Australian Eastern time.'
          )}
        </Text>

        <Flex direction='column' gap={2}>
          {RACES_2026.map((race) => {
            const past = now !== null && isRacePast(race, now);
            const isNext = next?.round === race.round;
            const expanded = open === race.round;
            return (
              <Box
                key={race.round}
                rounded='2xl'
                overflow='hidden'
                borderWidth='1px'
                borderColor={isNext ? accent : { base: 'gray.200', _dark: 'dark.100' }}
                backgroundColor={
                  isNext ? accentSoft : { base: 'white', _dark: 'dark.300' }
                }
                opacity={past && !expanded ? 0.5 : 1}
                transition='opacity 0.2s'
              >
                <Flex
                  as='button'
                  w='full'
                  align='center'
                  gap={3}
                  textAlign='left'
                  paddingX='16px'
                  paddingY='13px'
                  cursor='pointer'
                  onClick={() => setOpen(expanded ? null : race.round)}
                >
                  <Text fontSize='xs' fontWeight={800} color={{ base: 'gray.400', _dark: 'gray.500' }} w='26px' flexShrink={0}>
                    R{race.round}
                  </Text>
                  <Text fontSize='22px' flexShrink={0}>
                    {race.flag}
                  </Text>
                  <Box flex={1} minW={0}>
                    <Text fontWeight={700} fontSize='sm' lineClamp={1}>
                      {race.name.replace(' Grand Prix', ' GP')}
                      {race.isSprint && (
                        <Text as='span' marginLeft={2} fontSize='2xs' fontWeight={800} color={accent} letterSpacing='0.08em'>
                          SPRINT
                        </Text>
                      )}
                    </Text>
                    <Text fontSize='xs' color={{ base: 'gray.500', _dark: 'gray.400' }} lineClamp={1}>
                      {race.circuit}
                    </Text>
                  </Box>
                  <Text fontSize='xs' fontWeight={700} color={{ base: 'gray.600', _dark: 'gray.300' }} whiteSpace='nowrap' flexShrink={0}>
                    {formatRaceDaySydney(race)}
                  </Text>
                  <Box
                    flexShrink={0}
                    transform={expanded ? 'rotate(180deg)' : 'none'}
                    transition='transform 0.2s'
                    color={{ base: 'gray.400', _dark: 'gray.500' }}
                  >
                    <LuChevronDown />
                  </Box>
                </Flex>

                {expanded && (
                  <Box
                    paddingX='16px'
                    paddingBottom='16px'
                    paddingTop='4px'
                    borderTop='1px solid'
                    borderColor={{ base: 'gray.100', _dark: 'dark.100' }}
                    animation='fadeSlideUp 0.25s ease-out'
                  >
                    <Text fontSize='xs' color={{ base: 'gray.500', _dark: 'gray.400' }} marginTop='10px' marginBottom='4px'>
                      Round {race.round} · {race.circuit} · {race.country}
                    </Text>
                    {race.note && (
                      <Text fontSize='xs' color={accent} marginBottom='6px'>
                        {race.note}
                      </Text>
                    )}
                    <Box marginTop='8px'>
                      <SessionRow label={race.isSprint ? 'Sprint qualifying' : 'Qualifying'} value={sessionTimeAEST(race.isSprint ? race.sprintQualifying : race.qualifying)} />
                      {race.isSprint && <SessionRow label='Sprint' value={sessionTimeAEST(race.sprint)} />}
                      {race.isSprint && <SessionRow label='Qualifying' value={sessionTimeAEST(race.qualifying)} />}
                      <SessionRow label='Race' value={sessionTimeAEST(race.race)} />
                    </Box>
                    {!race.race && !race.qualifying && (
                      <Text fontSize='2xs' color={{ base: 'gray.400', _dark: 'gray.600' }} marginTop='8px'>
                        Session times not confirmed yet — add them in{' '}
                        <Text as='code' fontSize='2xs'>
                          src/constants/races2026.ts
                        </Text>
                        .
                      </Text>
                    )}
                  </Box>
                )}
              </Box>
            );
          })}
        </Flex>

        <Center marginTop='20px'>
          <Text fontSize='2xs' color={{ base: 'gray.400', _dark: 'gray.600' }} textAlign='center'>
            23 rounds. The April Bahrain & Saudi Arabia rounds were cancelled; the Bahrain GP was
            re-staged at Sepang. Verify dates on formula1.com.
          </Text>
        </Center>
      </Box>
    </Container>
  );
}
