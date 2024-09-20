import { cn } from '@lib/utils';
import { RefreshCcw, RefreshCw } from 'lucide-react';
import React from 'react';

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
            {isShadow && <RefreshCw size={6} />}
            {isReverseShadow && <RefreshCcw size={6} />}
          </div>
        ) : (
          <div
            className={cn(
              'flex h-[26px] w-[60px] items-center justify-center bg-neutral-300 text-neutral-900',
              position === 'start' && 'rounded-l-md',
              position === 'end' && 'rounded-r-md',
            )}
          >
            {isShadow && <RefreshCw size={6} />}
            {isReverseShadow && <RefreshCcw size={6} />}
          </div>
        )}
      </div>
      {isHistoryTrainingCardVisible && <div>{slotHistoryTrainingCard}</div>}
    </div>
  );
}
