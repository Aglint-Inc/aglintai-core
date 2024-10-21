import { cn } from '@lib/utils';
import React from 'react';

import InterviewStageConnector from './interviewStageConnector';
import { statusColors } from './statusColors';


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
      index !== 0 && orientation === 'vertical' && 'mt-[12px]',
    );

  return (
    <div className={containerClass}>
      {stages.map((stage, index) => (
        <div key={index} className={stageClass(index)} onClick={stage.onClick}>
          <div
            className={cn(
              'h-full rounded-md border p-4',
              stage.isActive ? statusColors[stage.status].activeBg : statusColors[stage.status].bg,
              stage.isActive ? statusColors[stage.status].activeBorder : statusColors[stage.status].border,
              statusColors[stage.status].text,
            )}
          >
            <h3 className='font-semibold'>{stage.testName}</h3>
            <p className='mt-1 flex items-center gap-2 text-sm'>
              {statusColors[stage.status].icon} {stage.description}
            </p>
          </div>
          {!!(index < stages.length - 1) && (
            <InterviewStageConnector
              position='bottom'
              size={30}
              status={stage.status}
              isActive={stage.isActive}
            />
          )}
          {(index > 0) && (
            <InterviewStageConnector
              position='top'
              size={30}
              status={stage.status}
              isActive={stage.isActive}
            />
          )}
        </div>
      ))}
    </div>
  );
}
