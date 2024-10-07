import { cn } from '@lib/utils';
import React from 'react';

import CSSArrow from './css-arrow';

type StageStatus =
  | 'not_started'
  | 'in_progress'
  | 'completed'
  | 'dropped_out'
  | 'planned';

interface StageProps {
  testName: string;
  description: string;
  status: StageStatus;
}

interface InterviewStagesProps {
  stages: StageProps[];
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

const statusColors: Record<
  StageStatus,
  { bg: string; text: string; border: string }
> = {
  not_started: {
    bg: 'bg-gray-100',
    text: 'text-gray-600',
    border: 'border-gray-300',
  },
  in_progress: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    border: 'border-blue-500',
  },
  completed: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    border: 'border-green-500',
  },
  dropped_out: {
    bg: 'bg-red-100',
    text: 'text-red-700',
    border: 'border-red-500',
  },
  planned: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-700',
    border: 'border-yellow-500',
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
      'flex-1 relative',
      orientation === 'horizontal' ? 'text-center' : 'text-left',
      index !== 0 && orientation === 'horizontal' && 'ml-6',
      index !== 0 && orientation === 'vertical' && 'mt-6',
    );

  return (
    <div className={containerClass}>
      {stages.map((stage, index) => (
        <div key={index} className={stageClass(index)}>
          <div
            className={cn(
              'h-full rounded-md border p-4',
              statusColors[stage.status].bg,
              statusColors[stage.status].text,
              statusColors[stage.status].border,
            )}
          >
            <h3 className='font-semibold'>{stage.testName}</h3>
            <p className='mt-1 text-sm'>{stage.description}</p>
          </div>
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
                direction={orientation === 'horizontal' ? 'up' : 'right'}
                size='sm'
                borderColor={statusColors[stage.status].border}
                backgroundColor={statusColors[stage.status].bg}
                cornerRadius={2}
              />
            </div>
          )}
          {index > 0 && (
            <div
              className={cn(
                'absolute',
                orientation === 'horizontal'
                  ? '-left-2 top-1/2 -translate-y-1/2'
                  : 'bottom-0 left-1/2 -translate-x-1/2 rotate-90',
              )}
            >
              <CSSArrow
                direction={orientation === 'horizontal' ? 'up' : 'right'}
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
