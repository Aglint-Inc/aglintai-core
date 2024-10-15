import { cn } from '@lib/utils';
import { Circle, CircleCheckIcon, CircleDot, CircleX } from 'lucide-react';
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
                'h-4 w-4 border-none',
                status === 'past' ? 'text-green-600' : 'border-border',
              )}
            >
              {status === 'past' && (
                <>
                  {/* <Check className='absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform text-white' /> */}
                  <CircleCheckIcon
                    strokeWidth={1.5}
                    className='absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform'
                  />
                </>
              )}
              {status === 'error' && (
                <CircleX className='absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform text-destructive' />
              )}
              {status === 'present' && (
                <CircleDot className='absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform text-blue-600' />
              )}
              {status === 'future' && (
                <Circle className='absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform text-gray-400' />
              )}
            </div>
          </>
        )}
      </div>
      <div className='mb-3 flex flex-col items-start'>
        <div className='flex items-center justify-between'>
          <div className='flex items-start'>
            <div>{slotLeftIcon}</div>
            <p className='flex-1 text-sm text-muted-foreground'>
              {textProgress}
            </p>
          </div>
        </div>
        <div>{slotRightIcon}</div>
        {isAiTextVisible && slotAiText && (
          <div className='mt-2'>{slotAiText}</div>
        )}
        {slotButton && <div className='mt-2'>{slotButton}</div>}
      </div>
    </div>
  );
}

export default ScheduleProgressTracker;
