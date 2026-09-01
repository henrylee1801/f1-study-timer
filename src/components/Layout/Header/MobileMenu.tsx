'use client';

import React from 'react';
import { Flex, HStack, Text, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { LuBookText, LuCalendarDays, LuChartColumn } from 'react-icons/lu';
import { ToggleThemeMode } from '@/components/Layout/Toggles/ThemeMode';
import { TogglePomodoroMode } from '@/components/Layout/Toggles/PomodoroMode';
import { ToggleExamMode } from '@/components/Layout/Toggles/ExamMode';
import { useRouter } from 'next/navigation';
import { useTimerGuard } from '@/hooks/useTimerGuard';

const items = [
  { href: '/stats', label: 'Study stats', icon: <LuChartColumn /> },
  { href: '/calendar', label: 'F1 calendar', icon: <LuCalendarDays /> },
  { href: '/learn', label: 'Learn Formula 1', icon: <LuBookText /> },
];

export const MobileMenu = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();
  const { confirmInterruptIfRunning } = useTimerGuard();

  const handleNav = async (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (!(await confirmInterruptIfRunning())) return;
    onClose();
    router.push(href);
  };

  return (
    <Flex direction='column' height='full' justifyContent='space-between' gap={6}>
      <VStack align='stretch' gap={3}>
        {items.map((item) => (
          <NextLink
            key={item.href}
            href={item.href}
            aria-label={item.label}
            onClick={(e) => handleNav(e, item.href)}
          >
            <HStack
              gap={3}
              fontWeight='medium'
              bgColor={{ base: 'gray.100', _hover: 'gray.200', _dark: 'gray.700' }}
              padding={4}
              rounded='xl'
              color={{ base: 'gray.700', _hover: 'gray.900', _dark: 'gray.200' }}
            >
              {item.icon}
              <Text>{item.label}</Text>
            </HStack>
          </NextLink>
        ))}
      </VStack>

      <VStack gap={4} align='center' mb={16}>
        <HStack gap={2} justifyContent='center'>
          <TogglePomodoroMode />
          <ToggleExamMode />
          <ToggleThemeMode />
        </HStack>
      </VStack>
    </Flex>
  );
};
