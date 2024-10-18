import { cn } from '@lib/utils';
import React from 'react';

import ReverseShadowIcon from '@/authenticated/components/ReverseShadowIcon';
import ShadowIcon from '@/authenticated/components/ShadowIcon';

interface HistoryPillProps {
  isReverseShadow?: boolean;
  isShadow?: boolean;
  isActive?: boolean;
  position?: 'start' | 'end' | '';
  slotHistoryTrainingCard?: React.ReactNode;
  isHistoryTrainingCardVisible?: boolean;
}

export function HistoryPillShadcn({
  isReverseShadow = false,
  isShadow = true,
  isActive = false,
  position,
  slotHistoryTrainingCard,
  isHistoryTrainingCardVisible = true,
}: HistoryPillProps) {
  return (
    <div className='relative flex cursor-pointer items-center justify-center'>
      <div className='relative'>
        {isActive ? (
          <div
            className={cn(
              '00 flex h-[26px] w-[60px] items-center justify-center bg-green-500/40',
              position === 'start' && 'rounded-l-md',
              position === 'end' && 'rounded-r-md',
            )}
          >
            {isShadow && (
              <ShadowIcon className='h-4 w-4 text-green-800 dark:text-green-600' />
            )}
            {isReverseShadow && (
              <ReverseShadowIcon className='h-4 w-4 text-green-800 dark:text-green-600' />
            )}
          </div>
        ) : (
          <div
            className={cn(
              'flex h-[26px] w-[60px] items-center justify-center bg-muted text-foreground',
              position === 'start' && 'rounded-l-md',
              position === 'end' && 'rounded-r-md',
            )}
          >
            {isShadow && (
              <ShadowIcon className='h-4 w-4 text-muted-foreground' />
            )}
            {isReverseShadow && (
              <ReverseShadowIcon className='h-4 w-4 text-muted-foreground' />
            )}
          </div>
        )}
      </div>
      {isHistoryTrainingCardVisible && <div>{slotHistoryTrainingCard}</div>}
    </div>
  );
}
