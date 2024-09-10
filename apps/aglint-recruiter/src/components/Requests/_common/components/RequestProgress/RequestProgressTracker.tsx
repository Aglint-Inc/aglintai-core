import { cn } from '@lib/utils';
import React from 'react';

interface RequestProgressProps {
  circleIndicator?: 'success' | 'error' | 'default' | 'info' | 'warning';
  textRequestProgress: string;
  slotProgress?: React.ReactNode;
  isDividerVisible?: boolean;
  isLastNode?: boolean;
}

export function RequestProgressTracker({
  circleIndicator = 'default',
  textRequestProgress,
  slotProgress,
  isDividerVisible = true,
  isLastNode = false,
}: RequestProgressProps) {
  return (
    <div className='flex gap-3'>
      <div className='flex flex-col items-center pt-1'>
        <div className='flex w-[18px] h-[18px] justify-center items-center'>
          <div
            className={cn('w-[10px] h-[10px] rounded-full', {
              'bg-neutral-300': circleIndicator === 'default',
              'bg-green-500': circleIndicator === 'success',
              'bg-red-500': circleIndicator === 'error',
              'bg-gray-500': circleIndicator === 'info',
              'bg-yello-500': circleIndicator === 'warning',
            })}
          />
        </div>
        {isDividerVisible && !isLastNode && (
          <div className='w-[1px] h-full bg-neutral-200' />
        )}
      </div>
      <div className='flex flex-col gap-4 mb-8'>
        <div className='inline-flex px-1.5 py-0.5 border border-neutral-200 rounded text-sm text-neutral-700 whitespace-nowrap max-w-max'>
          {textRequestProgress}
        </div>
        <div className='flex flex-col gap-2'>{slotProgress}</div>
      </div>
    </div>
  );
}
