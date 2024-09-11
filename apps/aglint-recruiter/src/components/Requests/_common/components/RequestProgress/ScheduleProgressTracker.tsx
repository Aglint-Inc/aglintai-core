import { cn } from '@lib/utils';
import { Check } from 'lucide-react';
import React from 'react';

interface ScheduleProgressProps {
  status?: string;
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
                'w-4 h-4 rounded-full border-2',
                status === 'completed'
                  ? 'border-green-500 bg-green-500'
                  : 'border-gray-300',
              )}
            >
              {status === 'completed' && (
                <Check className='w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
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
        <div className='mt-4 mb-8'>{slotRightIcon}</div>
        {isAiTextVisible && slotAiText && (
          <div className='mt-1'>{slotAiText}</div>
        )}
        {slotButton && <div className='mt-2'>{slotButton}</div>}
      </div>
    </div>
  );
}

export default ScheduleProgressTracker;
