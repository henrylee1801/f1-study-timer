'use client';

import { useRef, useState } from 'react';
import { Box, Button, Container, Flex, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { jersey15 } from '@/assets/fonts/Jersey';
import { useStudyStats } from '@/hooks/useStudyStats';
import { useStudyStore } from '@/stores/Study.store';
import { useThemeAccent } from '@/hooks/useThemeAccent';
import { downloadBackup, restoreBackup } from '@/utils/dataBackup';

const fmtHrs = (mins: number) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h && m) return `${h}h ${m}m`;
  if (h) return `${h}h`;
  return `${m}m`;
};

export default function StatsPage() {
  const stats = useStudyStats();
  const clearSessions = useStudyStore((s) => s.clearSessions);
  const { isDark, accent } = useThemeAccent();
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const handleImport = async (file: File) => {
    const ok = await restoreBackup(file);
    setMsg(ok ? 'Restored — reloading…' : 'That file did not look like a backup.');
    if (ok) setTimeout(() => window.location.reload(), 800);
  };

  const Stat = ({ label, value, sub }: { label: string; value: string; sub?: string }) => (
    <Box
      padding='16px'
      rounded='2xl'
      backgroundColor={{ base: 'white', _dark: 'dark.300' }}
      borderWidth='1px'
      borderColor={{ base: 'gray.200', _dark: 'dark.100' }}
    >
      <Text fontSize='2xs' fontWeight={700} color={{ base: 'gray.500', _dark: 'gray.400' }} textTransform='uppercase' letterSpacing='0.08em'>
        {label}
      </Text>
      <Text fontSize='2xl' fontWeight={800} marginTop='2px' color={isDark ? 'white' : accent}>
        {value}
      </Text>
      {sub && (
        <Text fontSize='xs' color={{ base: 'gray.400', _dark: 'gray.500' }}>
          {sub}
        </Text>
      )}
    </Box>
  );

  return (
    <Container maxW='620px' minHeight='80vh' paddingY={{ base: 6, md: 12 }} animation='fadeSlideUp 0.5s ease-out'>
      <Box
        rounded='3xl'
        padding={{ base: '26px 18px', md: '34px 32px' }}
        backgroundColor={{ base: 'gray.50', _dark: 'dark.200' }}
        boxShadow={{ base: 'none', md: 'md' }}
      >
        <Text className={jersey15.className} fontSize={{ base: '4xl', md: '5xl' }} lineHeight='1' color={{ base: 'gray.800', _dark: 'white' }}>
          Study stats
        </Text>
        <Text color={{ base: 'gray.500', _dark: 'gray.400' }} fontSize='sm' marginTop='8px' marginBottom='24px'>
          Every finished focus session and exam run, saved in this browser.
        </Text>

        <SimpleGrid columns={{ base: 2, md: 4 }} gap={3} marginBottom='28px'>
          <Stat label='Today' value={fmtHrs(stats.todayMinutes)} />
          <Stat label='This week' value={fmtHrs(stats.weekMinutes)} />
          <Stat label='Streak' value={`${stats.streak}d`} sub='days in a row' />
          <Stat label='All time' value={fmtHrs(stats.totalMinutes)} sub={`${stats.totalSessions} sessions`} />
        </SimpleGrid>

        <Text fontSize='sm' fontWeight={700} marginBottom='12px'>
          Last 14 days
        </Text>
        <Flex align='flex-end' gap='6px' height='140px' marginBottom='28px'>
          {stats.days.map((d) => (
            <Flex key={d.key} direction='column' align='center' flex={1} height='100%' justify='flex-end' gap='6px'>
              <Box
                w='100%'
                maxW='26px'
                rounded='md'
                minHeight='3px'
                height={`${(d.minutes / stats.maxDayMinutes) * 100}%`}
                backgroundColor={d.minutes ? accent : { base: 'gray.200', _dark: 'dark.100' }}
                title={`${d.label}: ${fmtHrs(d.minutes)}`}
              />
              <Text fontSize='2xs' color={{ base: 'gray.400', _dark: 'gray.500' }}>
                {d.label.split(' ')[1]}
              </Text>
            </Flex>
          ))}
        </Flex>

        <Flex justify='space-between' align='center' marginBottom='12px'>
          <Text fontSize='sm' fontWeight={700}>
            History
          </Text>
          {stats.recent.length > 0 && (
            <Button
              size='xs'
              variant='ghost'
              color={{ base: 'gray.400', _hover: 'red.500' }}
              onClick={() => {
                if (confirm('Clear all study history? This cannot be undone.')) clearSessions();
              }}
            >
              Clear history
            </Button>
          )}
        </Flex>

        {stats.recent.length === 0 ? (
          <Text fontSize='sm' color={{ base: 'gray.400', _dark: 'gray.500' }}>
            No sessions yet. Finish a focus session or an exam run and it shows up here.
          </Text>
        ) : (
          <VStack align='stretch' gap={1}>
            {stats.recent.map((s) => (
              <Flex
                key={s.id}
                justify='space-between'
                align='center'
                paddingX='12px'
                paddingY='10px'
                rounded='lg'
                backgroundColor={{ base: 'white', _dark: 'dark.300' }}
              >
                <Flex align='center' gap={2} minW={0}>
                  <Text fontSize='sm'>{s.kind === 'exam' ? '🎓' : '🏁'}</Text>
                  <Text fontSize='sm' lineClamp={1}>
                    {s.label || (s.kind === 'exam' ? 'Exam run' : 'Focus session')}
                  </Text>
                </Flex>
                <Flex align='center' gap={3} flexShrink={0}>
                  <Text fontSize='sm' fontWeight={700}>
                    {fmtHrs(s.minutes)}
                  </Text>
                  <Text fontSize='xs' color={{ base: 'gray.400', _dark: 'gray.500' }}>
                    {new Date(s.at).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}
                  </Text>
                </Flex>
              </Flex>
            ))}
          </VStack>
        )}

        <Box marginTop='32px' paddingTop='20px' borderTop='1px solid' borderColor={{ base: 'gray.200', _dark: 'dark.100' }}>
          <Text fontSize='sm' fontWeight={700} marginBottom='4px'>
            Backup
          </Text>
          <Text fontSize='xs' color={{ base: 'gray.500', _dark: 'gray.400' }} marginBottom='12px'>
            Save everything (settings, history, tasks) to a file, or restore it on another device / browser.
          </Text>
          <Flex gap={2} wrap='wrap'>
            <Button size='sm' rounded='full' backgroundColor={accent} color={isDark ? 'dark.200' : 'white'} _hover={{ opacity: 0.9 }} onClick={downloadBackup}>
              Export backup
            </Button>
            <Button size='sm' rounded='full' variant='outline' onClick={() => fileRef.current?.click()}>
              Import backup
            </Button>
            <input
              ref={fileRef}
              type='file'
              accept='application/json'
              hidden
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleImport(f);
                e.target.value = '';
              }}
            />
          </Flex>
          {msg && (
            <Text fontSize='xs' marginTop='8px' color={{ base: 'gray.600', _dark: 'gray.300' }}>
              {msg}
            </Text>
          )}
        </Box>
      </Box>
    </Container>
  );
}
