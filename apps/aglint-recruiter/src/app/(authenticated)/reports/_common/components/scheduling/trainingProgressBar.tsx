import { cn } from '@lib/utils';
import React from 'react';

type StageType = 'shadow' | 'reverseShadow';
type StageStatus = 'completed' | 'incomplete';

export interface TrainingHistoryStageType {
  type: StageType;
  status: StageStatus;
}

interface TrainingHistoryProps {
  stages: TrainingHistoryStageType[];
  className?: string;
}

export default function TrainingProgressBar({
  stages,
  className,
}: TrainingHistoryProps) {
  return (
    <div className={cn('mx-auto w-full', className)}>
      <div className='flex flex-wrap gap-1'>
        {stages.map((stage, index) => (
          <div
            key={index}
            className={cn(
              'flex h-6 w-14 items-center justify-center rounded-md',
              stage.status === 'completed' ? 'bg-primary/20' : 'bg-muted',
            )}
          >
            <span
              className={cn(
                'text-sm font-medium',
                stage.status === 'completed'
                  ? stage.type === 'shadow'
                    ? 'text-primary'
                    : 'text-primary'
                  : 'text-muted-foreground',
              )}
            >
              {stage.type === 'shadow' ? 'S' : 'R'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
