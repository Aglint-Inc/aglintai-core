import { CalendarCheck2, CalendarOff, CircleCheckBig } from 'lucide-react';
import { type ReactNode } from 'react';

type StageStatus = 'completed' | 'confirmed' | 'not_scheduled';

interface StatusColor {
  bg: string;
  text: string;
  border: string;
  activeBg: string;
  activeBorder: string;
  icon: ReactNode;
}

export const statusColors: Record<StageStatus, StatusColor> = {
  not_scheduled: {
    bg: 'bg-gray-50 dark:bg-[#141414]',
    text: 'text-gray-700 dark:text-gray-300',
    border: 'border-gray-300 dark:border-gray-600',
    icon: <CalendarOff size={16} />,
    activeBg: 'bg-gray-200 dark:bg-[#232324]',
    activeBorder: 'border-gray-500 dark:border-gray-600',
  },
  confirmed: {
    bg: 'bg-blue-50 dark:bg-[#182238]',
    text: 'text-blue-800 dark:text-blue-300',
    border: 'border-blue-300 dark:border-blue-400',
    icon: <CalendarCheck2 size={16} />,
    activeBg: 'bg-blue-100 dark:bg-[#182238]',
    activeBorder: 'border-blue-500 dark:border-blue-600',
  },
  completed: {
    bg: 'bg-green-50',
    text: 'text-green-800',
    border: 'border-green-300',
    icon: <CircleCheckBig size={16} />,
    activeBg: 'bg-green-100',
    activeBorder: 'border-green-500',
  },
};
