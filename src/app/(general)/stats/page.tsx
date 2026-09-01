'use client';

import { useRef, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useStudyStats } from '@/hooks/useStudyStats';
import { useStudyStore } from '@/stores/Study.store';
import { downloadBackup, restoreBackup } from '@/utils/dataBackup';

const fmtHrs = (mins: number) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h && m) return `${h}h ${m}m`;
  if (h) return `${h}h`;
  return `${m}m`;
};

const Stat = ({ label, value, sub }: { label: string; value: string; sub?: string }) => (
  <Box
    padding='16px'
    rounded='2xl'
    backgroundColor={{ base: 'gray.50', _dark: 'dark.200' }}
    borderWidth='1px'
    borderColor={{ base: 'gray.100', _dark: 'dark.100' }}
  >
    <Text fontSize='xs' fontWeight={600} color={{ base: 'gray.500', _dark: 'gray.400' }} textTransform='uppercase' letterSpacing='wide'>
      {label}
    </Text>
    <Text fontSize='2xl' fontWeight={800} marginTop='2px'>
      {value}
    </Text>
    {sub && (
      <Text fontSize='xs' color={{ base: 'gray.400', _dark: 'gray.500' }}>
        {sub}
      </Text>
    )}
  </Box>
);

export default function StatsPage() {
  const stats = useStudyStats();
  const clearSessions = useStudyStore((s) => s.clearSessions);
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const handleImport = async (file: File) => {
    const ok = await restoreBackup(file);
    setMsg(ok ? 'Restored. Reloading…' : 'That file did not look like a backup.');
    if (ok) setTimeout(() => window.location.reload(), 800);
  };

  return (
    <Container maxW='680px' minHeight='80vh' paddingY={{ base: 6, md: 10 }}>
      <Heading size='xl' marginBottom='4px'>
        Study stats
      </Heading>
      <Text color={{ base: 'gray.500', _dark: 'gray.400' }} fontSize='sm' marginBottom='24px'>
        Every finished focus session and exam run, saved in this browser.
      </Text>

      <SimpleGrid columns={{ base: 2, md: 4 }} gap={3} marginBottom='28px'>
        <Stat label='Today' value={fmtHrs(stats.todayMinutes)} />
        <Stat label='This week' value={fmtHrs(stats.weekMinutes)} />
        <Stat label='Streak' value={`${stats.streak}d`} sub='days in a row' />
        <Stat label='All time' value={fmtHrs(stats.totalMinutes)} sub={`${stats.totalSessions} sessions`} />
      </SimpleGrid>

      <Text fontSize='sm' fontWeight={700} marginBottom='10px'>
        Last 14 days
      </Text>
      <Flex align='flex-end' gap='6px' height='140px' marginBottom='28px'>
        {stats.days.map((d) => (
          <Flex key={d.key} direction='column' align='center' flex={1} height='100%' justify='flex-end' gap='6px'>
            <Box
              w='100%'
              maxW='28px'
              rounded='md'
              minHeight='3px'
              height={`${(d.minutes / stats.maxDayMinutes) * 100}%`}
              backgroundColor={d.minutes ? 'red.400' : { base: 'gray.200', _dark: 'dark.100' }}
              title={`${d.label}: ${fmtHrs(d.minutes)}`}
            />
            <Text fontSize='2xs' color={{ base: 'gray.400', _dark: 'gray.500' }} whiteSpace='nowrap'>
              {d.label.split(' ')[1]}
            </Text>
          </Flex>
        ))}
      </Flex>

      <Flex justify='space-between' align='center' marginBottom='10px'>
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
              paddingY='9px'
              rounded='lg'
              backgroundColor={{ base: 'gray.50', _dark: 'dark.200' }}
            >
              <Flex align='center' gap={2} minW={0}>
                <Text fontSize='sm'>{s.kind === 'exam' ? '🎓' : '🏁'}</Text>
                <Text fontSize='sm' lineClamp={1}>
                  {s.label || (s.kind === 'exam' ? 'Exam run' : 'Focus session')}
                </Text>
              </Flex>
              <Flex align='center' gap={3} flexShrink={0}>
                <Text fontSize='sm' fontWeight={600}>
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
        <Text fontSize='xs' color={{ base: 'gray.500', _dark: 'gray.400' }} marginBottom='10px'>
          Save everything (settings, history, tasks) to a file, or restore it on another device / browser.
        </Text>
        <Flex gap={2} wrap='wrap'>
          <Button size='sm' rounded='full' onClick={downloadBackup}>
            Export backup
          </Button>
          <Button
            size='sm'
            rounded='full'
            variant='outline'
            onClick={() => fileRef.current?.click()}
          >
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
    </Container>
  );
}
