'use client';

import { ToggleThemeMode } from '@/components/Layout/Toggles/ThemeMode';
import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import React from 'react';
import Link from 'next/link';
import { LuBookText, LuCalendarDays, LuChartColumn, LuMenu } from 'react-icons/lu';
import { TogglePomodoroMode } from '@/components/Layout/Toggles/PomodoroMode';
import { ToggleExamMode } from '@/components/Layout/Toggles/ExamMode';
import { Tooltip } from '@/components/ui/tooltip';
import { useDrawer } from '@/contexts/DrawerContext';
import { useTimerGuard } from '@/hooks/useTimerGuard';
import { MobileMenu } from './MobileMenu';

const Wordmark = ({ compact = false }: { compact?: boolean }) => (
  <Link rel='noopener noreferrer' href={'/'}>
    <Text
      as='span'
      fontWeight='extrabold'
      letterSpacing='-0.01em'
      fontSize={compact ? 'md' : { base: 'lg', md: 'xl' }}
      color={{ base: 'gray.800', _dark: 'white' }}
      whiteSpace='nowrap'
      lineHeight='1'
    >
      Kathryn&rsquo;s{' '}
      <Text as='span' color={{ base: 'red.600', _dark: 'red.400' }}>
        F1
      </Text>{' '}
      Study Time
    </Text>
  </Link>
);

const NavIcon = ({
  href,
  label,
  guard,
  children,
}: {
  href: string;
  label: string;
  guard: (e: React.MouseEvent, href: string) => void;
  children: React.ReactNode;
}) => (
  <Tooltip openDelay={100} closeDelay={100} content={label}>
    <Box as='span' display='inline-flex'>
      <Link href={href} aria-label={label} onClick={(e) => guard(e, href)}>
        <IconButton
          as='span'
          variant='ghost'
          rounded='full'
          size='sm'
          color={{ base: 'gray.500', _hover: 'gray.800' }}
          aria-label={label}
        >
          {children}
        </IconButton>
      </Link>
    </Box>
  </Tooltip>
);

export const Header = () => {
  const { openDrawer } = useDrawer();
  const { guardLink } = useTimerGuard();

  const openMenu = () =>
    openDrawer({
      component: MobileMenu,
      placement: 'start',
      size: 'xs',
      topTitle: { label: 'Kathryn’s F1 Study Time' },
    });

  return (
    <Flex
      as='header'
      align='center'
      justify='space-between'
      gap={3}
      paddingX={{ base: 4, md: 8 }}
      paddingY={{ base: 3, md: 5 }}
      minH={{ base: '64px', md: '76px' }}
      maxW='1100px'
      marginX='auto'
      w='full'
    >
      {/* Left: nav (desktop) / menu (mobile) */}
      <Flex align='center' gap={1} flex='1' minW={0}>
        <Box display={{ base: 'inline-flex', md: 'none' }}>
          <IconButton
            aria-label='Open menu'
            variant='ghost'
            rounded='full'
            size='sm'
            color={{ base: 'gray.600', _hover: 'gray.900' }}
            onClick={openMenu}
          >
            <LuMenu />
          </IconButton>
        </Box>
        <Flex align='center' gap={1} display={{ base: 'none', md: 'inline-flex' }}>
          <NavIcon href='/stats' label='Study stats' guard={guardLink}>
            <LuChartColumn />
          </NavIcon>
          <NavIcon href='/calendar' label='F1 calendar' guard={guardLink}>
            <LuCalendarDays />
          </NavIcon>
          <NavIcon href='/learn' label='Learn Formula 1' guard={guardLink}>
            <LuBookText />
          </NavIcon>
        </Flex>
      </Flex>

      {/* Center: wordmark */}
      <Flex align='center' justify='center' flexShrink={0}>
        <Box display={{ base: 'block', md: 'none' }}>
          <Wordmark compact />
        </Box>
        <Box display={{ base: 'none', md: 'block' }}>
          <Wordmark />
        </Box>
      </Flex>

      {/* Right: theme + mode toggles */}
      <Flex align='center' justify='flex-end' gap={1} flex='1' minW={0}>
        <Tooltip openDelay={100} closeDelay={100} content='Dark / light'>
          <Box as='span' display='inline-flex'>
            <ToggleThemeMode />
          </Box>
        </Tooltip>
        <Tooltip openDelay={100} closeDelay={100} content='Full / minimal view'>
          <Box as='span' display={{ base: 'none', sm: 'inline-flex' }}>
            <TogglePomodoroMode />
          </Box>
        </Tooltip>
        <Tooltip openDelay={100} closeDelay={100} content='Study / exam mode'>
          <Box as='span' display='inline-flex'>
            <ToggleExamMode />
          </Box>
        </Tooltip>
      </Flex>
    </Flex>
  );
};
