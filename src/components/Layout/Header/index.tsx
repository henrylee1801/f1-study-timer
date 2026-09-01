'use client';

import { ToggleThemeMode } from '@/components/Layout/Toggles/ThemeMode';
import { Box, Grid, GridItem, HStack, IconButton, Text } from '@chakra-ui/react';
import React from 'react';
import { LocaleSwitch } from '@/components/Layout/Toggles/LocaleSwitch';
import Link from 'next/link';
import { LuBookText, LuMenu } from 'react-icons/lu';
import { TogglePomodoroMode } from '@/components/Layout/Toggles/PomodoroMode';
import { ToggleExamMode } from '@/components/Layout/Toggles/ExamMode';
import { Tooltip } from '@/components/ui/tooltip';
import { useTranslations } from 'use-intl';
import { useDrawer } from '@/contexts/DrawerContext';
import { useTimerGuard } from '@/hooks/useTimerGuard';
import { MobileMenu } from './MobileMenu';

const Wordmark = ({ size = 'md' }: { size?: 'sm' | 'md' }) => (
  <Link rel='noopener noreferrer' href={'/'}>
    <Text
      as='span'
      fontWeight='extrabold'
      letterSpacing='tight'
      fontSize={size === 'sm' ? 'lg' : { base: 'xl', md: '2xl' }}
      color={{ base: 'gray.800', _dark: 'white' }}
      whiteSpace='nowrap'
    >
      F1{' '}
      <Text as='span' color={{ base: 'red.600', _dark: 'red.400' }}>
        Study
      </Text>{' '}
      Timer
    </Text>
  </Link>
);

export const Header = () => {
  const t = useTranslations('header');
  const { openDrawer } = useDrawer();
  const { guardLink } = useTimerGuard();

  const handleOpenMenu = () => {
    openDrawer({
      component: MobileMenu,
      placement: 'start',
      size: 'xs',
      topTitle: {
        label: 'F1 Study Timer',
      },
    });
  };

  return (
    <React.Fragment>
      {/* Mobile */}
      <Grid
        display={{ base: 'grid', lg: 'none' }}
        templateColumns='1fr auto 1fr'
        alignItems='center'
        paddingX={4}
        paddingY={4}
        minH='72px'
      >
        <GridItem justifySelf='start'>
          <IconButton
            aria-label='Open menu'
            variant='ghost'
            rounded='full'
            color={{ base: 'gray.600', _hover: 'gray.800' }}
            onClick={handleOpenMenu}
          >
            <LuMenu />
          </IconButton>
        </GridItem>

        <GridItem justifySelf='center' minW={0}>
          <Wordmark size='sm' />
        </GridItem>

        <GridItem justifySelf='end' />
      </Grid>

      {/* Desktop */}
      <Grid
        display={{ base: 'none', lg: 'grid' }}
        templateColumns='1fr'
        alignItems='center'
        paddingX={{ base: 4, lg: 10 }}
        paddingY={{ base: 5, lg: 10 }}
        minH='100px'
      >
        <GridItem display='flex' justifyContent='center'>
          <HStack gap={1} maxW='100%'>
            <Tooltip openDelay={100} closeDelay={100} content={t('learn')}>
              <Box as='span' display='inline-flex'>
                <Link
                  href={'/learn'}
                  aria-label='Learn Formula 1'
                  onClick={(e) => guardLink(e, '/learn')}
                >
                  <IconButton
                    as={'span'}
                    variant={'ghost'}
                    rounded='full'
                    size={{ base: 'sm', md: 'md' }}
                    color={{ base: 'gray.500', _hover: 'gray.700' }}
                    aria-label='Learn Formula 1'
                  >
                    <LuBookText />
                  </IconButton>
                </Link>
              </Box>
            </Tooltip>

            <LocaleSwitch />

            <Box paddingX={{ base: 2, md: 4 }}>
              <Wordmark />
            </Box>

            <Tooltip openDelay={100} closeDelay={100} content={t('theme')}>
              <Box as='span' display='inline-flex'>
                <ToggleThemeMode />
              </Box>
            </Tooltip>

            <Tooltip openDelay={100} closeDelay={100} content={t('minimalMode')}>
              <Box as='span' display='inline-flex'>
                <TogglePomodoroMode />
              </Box>
            </Tooltip>

            <Tooltip openDelay={100} closeDelay={100} content={t('examMode')}>
              <Box as='span' display='inline-flex'>
                <ToggleExamMode />
              </Box>
            </Tooltip>
          </HStack>
        </GridItem>
      </Grid>
    </React.Fragment>
  );
};
