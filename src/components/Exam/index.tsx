'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Center,
  Flex,
  HStack,
  IconButton,
  Image,
  Input,
  Loader,
  Text,
  VStack,
} from '@chakra-ui/react';
import { GrPowerReset } from 'react-icons/gr';
import { LuPlus, LuTrash2 } from 'react-icons/lu';
import { TiCogOutline } from 'react-icons/ti';
import tinycolor from 'tinycolor2';
import { useTheme } from 'next-themes';
import { RippleButton } from '@/components/Pomodoro/components/RippleButton';
import { SpriteAnimation } from '@/components/SpriteAnimation';
import { Tab } from '@/components/Pomodoro/Settings';
import { useSettingsDialog } from '@/hooks/useSettingsDialog';
import useSettingsStore from '@/stores/Settings.store';
import { useSounds } from '@/hooks/useSounds';
import { formatSeconds } from '@/utils/formatSeconds.utils';
import { jua } from '@/assets/fonts/Jua';
import { MAX_EXAM_DURATION } from '@/constants/DefaultSettings';
import { ExamSection } from '@/interfaces/Settings.interface';
import { isDesktopDevice } from '@/utils/device.utils';
import { asset } from '@/utils/asset';
import { HSC_SUBJECTS } from '@/constants/hscSubjects';
import { useRecordSession } from '@/hooks/useStudyStats';

const clampDuration = (value: number) =>
  Math.min(MAX_EXAM_DURATION, Math.max(1, Math.round(value)));

const makeSectionId = () => `section-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

export const Exam = () => {
  const { theme } = useTheme();
  const { openSettings } = useSettingsDialog();
  const { playSound, resumeSound, radioSound } = useSounds();

  const currentScuderia = useSettingsStore((state) => state.currentScuderia);
  const enableNotifications = useSettingsStore((state) => state.enableNotifications);
  const exam = useSettingsStore((state) => state.exam);
  const setExam = useSettingsStore((state) => state.setExam);
  const setExamSubject = useSettingsStore((state) => state.setExamSubject);
  const setExamDuration = useSettingsStore((state) => state.setExamDuration);
  const setExamSections = useSettingsStore((state) => state.setExamSections);
  const setExamWarnings = useSettingsStore((state) => state.setExamWarnings);
  const recordSession = useRecordSession();

  const subjectLabel =
    HSC_SUBJECTS.find((s) => s.id === exam.subject)?.name ?? 'Exam run';
  const recordedRef = useRef(false);

  const recordIfWorthIt = (consumedMs: number) => {
    if (recordedRef.current) return;
    if (consumedMs >= 60_000) {
      recordedRef.current = true;
      recordSession({ minutes: consumedMs / 60_000, kind: 'exam', label: subjectLabel });
    }
  };

  const applySubject = (id: string) => {
    if (id === 'custom') {
      setExamSubject('custom');
      return;
    }
    const preset = HSC_SUBJECTS.find((s) => s.id === id);
    if (!preset) return;
    setExam({
      subject: id,
      duration: preset.duration,
      sections: preset.sections.map((s) => ({ ...s, id: makeSectionId() })),
    });
  };

  const totalMs = exam.duration * 60_000;

  const [running, setRunning] = useState(false);
  const [remainingMs, setRemainingMs] = useState(totalMs);
  const endsAtRef = useRef<number | null>(null);
  const firedRef = useRef<Set<string>>(new Set());
  const lastSectionRef = useRef<number>(0);
  // True once a run has been started, until the next reset. Distinguishes an
  // untouched/reset timer (should track the configured duration) from a paused
  // one (must keep its remaining time).
  const startedRef = useRef(false);

  const isIdle = !running && !startedRef.current;

  // Untouched timer follows the configured total (e.g. after picking a subject).
  useEffect(() => {
    if (!running && !startedRef.current) setRemainingMs(totalMs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalMs, running]);

  const notify = useCallback(
    (title: string, body: string) => {
      radioSound();
      if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
      if (
        isDesktopDevice() &&
        enableNotifications &&
        typeof Notification !== 'undefined' &&
        Notification.permission === 'granted'
      ) {
        new Notification(title, { body, icon: asset('/f1-icon.webp') });
      }
    },
    [enableNotifications, radioSound]
  );

  const tick = useCallback(() => {
    if (endsAtRef.current === null) return;
    const next = Math.max(0, endsAtRef.current - Date.now());
    setRemainingMs(next);

    const minutesLeft = next / 60_000;

    if (!firedRef.current.has('half') && next <= totalMs / 2 && next > 0) {
      firedRef.current.add('half');
      notify('Halfway through', `${formatSeconds(Math.round(next / 1000), 'clock')} remaining.`);
    }

    for (const w of exam.warnings) {
      const key = `w-${w}`;
      if (!firedRef.current.has(key) && minutesLeft <= w && next > 0) {
        firedRef.current.add(key);
        notify(`${w} minute${w === 1 ? '' : 's'} left`, 'Keep an eye on the clock.');
      }
    }

    if (next <= 0) {
      endsAtRef.current = null;
      setRunning(false);
      recordIfWorthIt(totalMs);
      notify("Time's up", 'Pens down — the exam window is over.');
      document.title = "Time's up - Exam";
      return;
    }

    document.title = `${formatSeconds(Math.round(next / 1000), 'clock')} - Exam`;
  }, [exam.warnings, notify, totalMs]);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(tick, 250);
    return () => window.clearInterval(id);
  }, [running, tick]);

  // Section bookkeeping + boundary announcements.
  const sectionView = useMemo(() => {
    const elapsedMs = totalMs - remainingMs;
    let acc = 0;
    let currentIndex = -1;
    let sectionRemainingMs = 0;
    for (let i = 0; i < exam.sections.length; i += 1) {
      const secMs = exam.sections[i].minutes * 60_000;
      if (elapsedMs < acc + secMs) {
        currentIndex = i;
        sectionRemainingMs = acc + secMs - elapsedMs;
        break;
      }
      acc += secMs;
    }
    return { currentIndex, sectionRemainingMs, elapsedMs };
  }, [exam.sections, remainingMs, totalMs]);

  useEffect(() => {
    if (!running) return;
    const idx = sectionView.currentIndex;
    if (idx !== -1 && idx !== lastSectionRef.current) {
      lastSectionRef.current = idx;
      const section = exam.sections[idx];
      if (section) notify('Next section', `Move on to “${section.name}”.`);
    }
  }, [sectionView.currentIndex, running, exam.sections, notify]);

  const sectionsTotal = exam.sections.reduce((sum, s) => sum + s.minutes, 0);

  const handleStart = () => {
    if (remainingMs <= 0) return;
    endsAtRef.current = Date.now() + remainingMs;
    if (isIdle) {
      firedRef.current = new Set();
      recordedRef.current = false;
      lastSectionRef.current = sectionView.currentIndex === -1 ? 0 : sectionView.currentIndex;
    }
    startedRef.current = true;
    setRunning(true);
    playSound();
  };

  const handlePause = () => {
    if (endsAtRef.current !== null) {
      setRemainingMs(Math.max(0, endsAtRef.current - Date.now()));
    }
    endsAtRef.current = null;
    setRunning(false);
    resumeSound();
  };

  const handleReset = () => {
    recordIfWorthIt(totalMs - remainingMs);
    endsAtRef.current = null;
    firedRef.current = new Set();
    recordedRef.current = false;
    startedRef.current = false;
    lastSectionRef.current = 0;
    setRunning(false);
    setRemainingMs(totalMs);
    document.title = 'Exam';
  };

  const updateSection = (id: string, patch: Partial<ExamSection>) => {
    setExamSections(exam.sections.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  };

  const addSection = () => {
    setExamSections([
      ...exam.sections,
      { id: makeSectionId(), name: `Section ${exam.sections.length + 1}`, minutes: 30 },
    ]);
  };

  const removeSection = (id: string) => {
    setExamSections(exam.sections.filter((s) => s.id !== id));
  };

  // ---- Colours: mirror the Pomodoro counter's team-aware treatment ----
  const isDark = theme === 'dark';
  const accent = isDark
    ? tinycolor(currentScuderia?.colors?.primary?.default)
    : tinycolor(currentScuderia?.colors?.background?.session);
  const counterColor = isDark
    ? 'white'
    : tinycolor(currentScuderia?.colors?.background?.session).darken(5).brighten(-30).toString();
  const buttonColor = accent
    .clone()
    .darken(isDark ? 15 : 10)
    .brighten(isDark ? 0 : -15)
    .toString();
  const spanColor = accent
    .clone()
    .darken(10)
    .brighten(isDark ? 0 : -5)
    .toString();

  const progress = totalMs > 0 ? 1 - remainingMs / totalMs : 0;

  return (
    <Box
      rounded='3xl'
      bg='white'
      backgroundColor={{
        base: 'transparent',
        md: 'gray.50',
        _dark: { base: 'transparent', md: 'dark.200' },
      }}
      boxShadow={{ base: 'none', md: 'md' }}
      width={{ base: '100%', md: '600px' }}
      margin='auto'
      marginBottom={{ base: '0', md: '50px' }}
      display='flex'
      flexDirection='column'
      padding={{ base: '30px 10px', md: '30px 40px' }}
    >
      <Center marginBottom='10px' marginTop={{ base: '0', md: '40px' }} position='relative'>
        <Box
          position='absolute'
          top='10%'
          left='50%'
          transform='translate(-50%, -50%)'
          display='inline-block'
        >
          {currentScuderia?.logoURL && (
            <Image
              src={currentScuderia.logoURL}
              alt='scuderia-logo'
              w='auto'
              h='auto'
              style={{
                WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0) 25%, rgba(0,0,0,1) 100%)',
                maskImage: 'linear-gradient(to top, rgba(0,0,0,0) 25%, rgba(0,0,0,1) 100%)',
              }}
            />
          )}
        </Box>

        {currentScuderia ? (
          <Box
            position='relative'
            zIndex='2'
            cursor='pointer'
            onClick={() => openSettings(Tab.SCUDERIA)}
            role='button'
            aria-label='Change car'
            transition='transform 0.2s'
            _hover={{ transform: 'scale(1.05)' }}
          >
            <SpriteAnimation
              src={currentScuderia.spriteURL as string}
              frameHeight={80}
              frameWidth={270}
              totalFrames={6}
              paused={!running}
            />
          </Box>
        ) : (
          <Loader opacity={0.6} width={40} height={40} />
        )}
      </Center>

      {/* Progress bar */}
      <Box
        w='full'
        h='6px'
        rounded='full'
        overflow='hidden'
        backgroundColor={{ base: 'gray.200', _dark: 'dark.100' }}
        marginTop='10px'
      >
        <Box
          h='full'
          width={`${Math.min(100, Math.max(0, progress * 100))}%`}
          backgroundColor={spanColor}
          transition='width 0.3s linear'
        />
      </Box>

      {/* Clock + controls */}
      <HStack
        w='full'
        marginY='16px'
        padding={{ base: '0 4px', md: '0 20px' }}
        gap={1}
        justifyContent='space-between'
      >
        <Box flex={1} display='flex' justifyContent='flex-end'>
          <IconButton
            onClick={handleReset}
            variant='ghost'
            size='lg'
            style={{ scale: 1.1 }}
            rounded='full'
            aria-label='Reset exam timer'
          >
            <GrPowerReset />
          </IconButton>
        </Box>

        <Center>
          <Text
            fontWeight='bold'
            style={{ fontSize: '5rem' }}
            data-pw-id='exam-timer-label'
            color={isDark ? 'white' : counterColor}
            className={jua.className}
          >
            {formatSeconds(Math.round(remainingMs / 1000), 'clock')}
          </Text>
        </Center>

        <Box flex={1} display='flex' justifyContent='flex-start'>
          <IconButton
            onClick={() => openSettings()}
            variant='ghost'
            size='lg'
            style={{ scale: 1.1 }}
            rounded='full'
            aria-label='Settings'
          >
            <TiCogOutline />
          </IconButton>
        </Box>
      </HStack>

      <RippleButton
        marginY='16px'
        fontWeight='semibold'
        buttonColor={buttonColor}
        spanColor={spanColor}
        textColor={isDark ? 'dark.200' : 'light'}
        isActive={running}
        onClick={running ? handlePause : handleStart}
        size='md'
      >
        {running ? 'Pause' : remainingMs === totalMs ? 'Start exam' : 'Resume'}
      </RippleButton>

      {/* Sections */}
      {exam.sections.length > 0 && (
        <VStack align='stretch' gap={1} marginTop='10px'>
          {exam.sections.map((section, index) => {
            const isCurrent = running && index === sectionView.currentIndex;
            const isDone = sectionView.currentIndex === -1 || index < sectionView.currentIndex;
            return (
              <Flex
                key={section.id}
                align='center'
                justify='space-between'
                paddingX='14px'
                paddingY='8px'
                rounded='xl'
                backgroundColor={
                  isCurrent
                    ? spanColor
                    : {
                        base: isDone ? 'gray.100' : 'transparent',
                        _dark: isDone ? 'dark.100' : 'transparent',
                      }
                }
                color={isCurrent ? (isDark ? 'dark.200' : 'white') : undefined}
                opacity={isDone && !isCurrent ? 0.55 : 1}
                transition='background-color 0.2s'
              >
                <Text fontWeight={isCurrent ? 700 : 500} fontSize='sm'>
                  {section.name}
                </Text>
                <Text fontSize='sm' fontVariantNumeric='tabular-nums'>
                  {isCurrent
                    ? formatSeconds(Math.round(sectionView.sectionRemainingMs / 1000), 'clock')
                    : `${section.minutes} min`}
                </Text>
              </Flex>
            );
          })}
        </VStack>
      )}

      {/* Config — only while idle */}
      {isIdle && (
        <Box
          marginTop='24px'
          paddingTop='18px'
          borderTop='1px solid'
          borderColor={{ base: 'gray.200', _dark: 'dark.100' }}
          animation='fadeSlideUp 0.4s ease-out'
        >
          <Flex align='center' justify='space-between' marginBottom='12px'>
            <Text fontSize='sm' fontWeight={600} color={{ base: 'gray.600', _dark: 'gray.300' }}>
              HSC subject
            </Text>
            <select
              value={exam.subject}
              onChange={(e) => applySubject(e.target.value)}
              style={{
                fontSize: '0.875rem',
                padding: '6px 10px',
                borderRadius: '6px',
                border: '1px solid var(--chakra-colors-gray-300, #cbd5e0)',
                background: isDark ? '#171717' : '#fff',
                color: 'inherit',
                cursor: 'pointer',
                maxWidth: '230px',
              }}
            >
              <option value='custom'>Custom</option>
              {HSC_SUBJECTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </Flex>

          <Flex align='center' justify='space-between' marginBottom='12px'>
            <Text fontSize='sm' fontWeight={600} color={{ base: 'gray.600', _dark: 'gray.300' }}>
              Total exam time
            </Text>
            <HStack gap={2}>
              <Input
                type='number'
                size='sm'
                width='72px'
                textAlign='center'
                min={1}
                max={MAX_EXAM_DURATION}
                value={exam.duration}
                onChange={(e) => {
                  setExamDuration(clampDuration(Number(e.target.value) || 1));
                  if (exam.subject !== 'custom') setExamSubject('custom');
                }}
              />
              <Text fontSize='sm' color={{ base: 'gray.500', _dark: 'gray.400' }}>
                min
              </Text>
            </HStack>
          </Flex>

          <Flex align='center' justify='space-between' marginBottom='8px'>
            <Text fontSize='sm' fontWeight={600} color={{ base: 'gray.600', _dark: 'gray.300' }}>
              Sections
            </Text>
            <IconButton aria-label='Add section' size='xs' variant='ghost' onClick={addSection}>
              <LuPlus />
            </IconButton>
          </Flex>

          <VStack align='stretch' gap={2}>
            {exam.sections.map((section) => (
              <HStack key={section.id} gap={2}>
                <Input
                  size='sm'
                  flex={1}
                  value={section.name}
                  placeholder='Section name'
                  onChange={(e) => updateSection(section.id, { name: e.target.value })}
                />
                <Input
                  type='number'
                  size='sm'
                  width='64px'
                  textAlign='center'
                  min={1}
                  value={section.minutes}
                  onChange={(e) =>
                    updateSection(section.id, {
                      minutes: Math.max(1, Math.round(Number(e.target.value) || 1)),
                    })
                  }
                />
                <IconButton
                  aria-label='Remove section'
                  size='xs'
                  variant='ghost'
                  color={{ base: 'gray.400', _hover: 'danger.fg' }}
                  onClick={() => removeSection(section.id)}
                >
                  <LuTrash2 />
                </IconButton>
              </HStack>
            ))}
          </VStack>

          {sectionsTotal !== exam.duration && exam.sections.length > 0 && (
            <Text fontSize='xs' color={{ base: 'gray.400', _dark: 'gray.500' }} marginTop='6px'>
              Sections add up to {sectionsTotal} min of {exam.duration} min total.
            </Text>
          )}

          <Flex align='center' justify='space-between' marginTop='16px'>
            <Text fontSize='sm' fontWeight={600} color={{ base: 'gray.600', _dark: 'gray.300' }}>
              Warn me at (min left)
            </Text>
            <Input
              size='sm'
              width='140px'
              textAlign='center'
              value={exam.warnings.join(', ')}
              onChange={(e) =>
                setExamWarnings(
                  e.target.value
                    .split(',')
                    .map((v) => Math.round(Number(v.trim())))
                    .filter((v) => Number.isFinite(v) && v > 0)
                )
              }
            />
          </Flex>
        </Box>
      )}
    </Box>
  );
};
