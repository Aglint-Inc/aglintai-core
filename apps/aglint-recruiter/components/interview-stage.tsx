import { cn } from '@lib/utils';
import { CalendarCheck2, CalendarOff, CircleCheckBig } from 'lucide-react';
import React from 'react';

import CSSArrow from './css-arrow';

type StageStatus = 'completed' | 'confirmed' | 'not_scheduled';

export interface StageProps {
  testName: string;
  description: string;
  status: StageStatus;
  onClick: () => void;
  isActive: boolean;
}

interface InterviewStagesProps {
  stages: StageProps[];
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

const statusColors: Record<
  StageStatus,
  { bg: string; text: string; border: string; icon: React.ReactNode }
> = {
  not_scheduled: {
    bg: 'bg-gray-100',
    text: 'text-gray-600',
    border: 'border-gray-300',
    icon: <CalendarOff size={16} />,
  },
  confirmed: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    border: 'border-blue-500',
    icon: <CalendarCheck2 size={16} />,
  },
  completed: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    border: 'border-green-500',
    icon: <CircleCheckBig size={16} />,
  },
};

export default function InterviewStages({
  stages,
  orientation = 'horizontal',
  className,
}: InterviewStagesProps) {
  const containerClass = cn(
    'flex overflow-hidden rounded-md',
    orientation === 'horizontal' ? 'flex-row' : 'flex-col',
    className,
  );

  const stageClass = (index: number) =>
    cn(
      'flex-1 relative cursor-pointer',
      orientation === 'horizontal' ? 'text-center' : 'text-left',
      index !== 0 && orientation === 'horizontal' && 'ml-6',
      index !== 0 && orientation === 'vertical' && 'mt-6',
    );

  return (
    <div className={containerClass}>
      {stages.map((stage, index) => (
        <div key={index} className={stageClass(index)} onClick={stage.onClick}>
          <div
            className={cn(
              'h-full rounded-md border p-4',
              statusColors[stage.status].bg,
              statusColors[stage.status].text,
              statusColors[stage.status].border,
            )}
          >
            <h3 className='font-semibold'>{stage.testName}</h3>
            <p className='mt-1 flex items-center gap-2 text-sm'>
              {statusColors[stage.status].icon} {stage.description}
            </p>
          </div>
          {/* Last item */}
          {index < stages.length - 1 && (
            <div
              className={cn(
                'absolute',
                orientation === 'horizontal'
                  ? '-right-2 top-1/2 -translate-y-1/2'
                  : 'bottom-0 left-1/2 -translate-x-1/2 rotate-90',
              )}
            >
              <CSSArrow
                direction={orientation === 'horizontal' ? 'up' : 'down'}
                size='sm'
                borderColor={statusColors[stage.status].border}
                backgroundColor={statusColors[stage.status].bg}
                cornerRadius={2}
              />
            </div>
          )}
          {/* after first item */}
          {index > 0 && (
            <div
              className={cn(
                'absolute',
                orientation === 'horizontal'
                  ? '-left-2 top-1/2 -translate-y-1/2'
                  : '-bottom--2 left-1/2 -translate-x-1/2 rotate-90',
              )}
            >
              <CSSArrow
                direction={orientation === 'horizontal' ? 'up' : 'up'}
                size='sm'
                borderColor={statusColors[stage.status].border}
                backgroundColor={'bg-white'}
                cornerRadius={2}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
