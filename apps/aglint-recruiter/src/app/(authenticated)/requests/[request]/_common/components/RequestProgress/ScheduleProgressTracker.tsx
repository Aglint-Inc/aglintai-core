import { cn } from '@lib/utils';
import { Check, CircleX } from 'lucide-react';
import React from 'react';

import { type ProgressTenseType } from './types';

interface ScheduleProgressProps {
  status?: ProgressTenseType;
  slotLeftIcon?: React.ReactNode;
  textProgress?: React.ReactNode;
  slotRightIcon?: React.ReactNode;
  slotAiText?: React.ReactNode;
  slotButton?: React.ReactNode;
  slotLoader?: React.ReactNode;
  isAiTextVisible?: boolean;
}

function ScheduleProgressTracker({
  status,
  slotLeftIcon,
  textProgress = '',
  slotRightIcon,
  slotAiText,
  slotButton,
  slotLoader,
  isAiTextVisible = true,
}: ScheduleProgressProps) {
  return (
    <div className='flex items-start space-x-4'>
      <div className='relative mt-1'>
        {slotLoader ? (
          slotLoader
        ) : (
          <>
            <div
              className={cn(
                'h-4 w-4 rounded-full border-2',
                status === 'past'
                  ? 'border-green-500 bg-green-500'
                  : 'border-border',
              )}
            >
              {status === 'past' && (
                <Check className='absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform text-white' />
              )}
              {status === 'error' && (
                <CircleX className='absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform text-red-500' />
              )}
            </div>
          </>
        )}
      </div>
      <div className='flex flex-col items-start'>
        <div className='flex items-center justify-between'>
          <div className='flex items-start space-x-2'>
            <div>{slotLeftIcon}</div>
            <p className='flex-1'>{textProgress}</p>
          </div>
        </div>
        <div className='mb-2 mt-2'>{slotRightIcon}</div>
        {isAiTextVisible && slotAiText && (
          <div className='mt-1'>{slotAiText}</div>
        )}
        {slotButton && <div className='mt-2'>{slotButton}</div>}
      </div>
    </div>
  );
}

export default ScheduleProgressTracker;