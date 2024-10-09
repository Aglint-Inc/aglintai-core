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
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    border: 'border-gray-300',
    icon: <CalendarOff size={16} />,
    activeBg: 'bg-gray-200',
    activeBorder: 'border-gray-500',
  },
  confirmed: {
    bg: 'bg-blue-50',
    text: 'text-blue-800',
    border: 'border-blue-300',
    icon: <CalendarCheck2 size={16} />,
    activeBg: 'bg-blue-100',
    activeBorder: 'border-blue-500',
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
