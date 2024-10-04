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
              'absolute inset-0 flex items-center justify-center bg-green-400 text-green-900',
              position === 'start' && 'rounded-l-md',
              position === 'end' && 'rounded-r-md',
            )}
          >
            {isShadow && <ShadowIcon className='h-5 w-5' />}
            {isReverseShadow && (
              <ReverseShadowIcon className='h-3 w-3 text-muted-foreground' />
            )}
          </div>
        ) : (
          <div
            className={cn(
              'flex h-[26px] w-[60px] items-center justify-center bg-neutral-200 text-foreground',
              position === 'start' && 'rounded-l-md',
              position === 'end' && 'rounded-r-md',
            )}
          >
            {isShadow && (
              <ShadowIcon className='h-3 w-3 text-muted-foreground' />
            )}
            {isReverseShadow && (
              <ReverseShadowIcon className='h-3 w-3 text-muted-foreground' />
            )}
          </div>
        )}
      </div>
      {isHistoryTrainingCardVisible && <div>{slotHistoryTrainingCard}</div>}
    </div>
  );
}
