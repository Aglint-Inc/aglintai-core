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
        <div className='flex h-[18px] w-[18px] items-center justify-center'>
          <div
            className={cn('h-[10px] w-[10px] rounded-full', {
              'bg-neutral-300': circleIndicator === 'default',
              'bg-green-500': circleIndicator === 'success',
              'bg-red-500': circleIndicator === 'error',
              'bg-gray-500': circleIndicator === 'info',
              'bg-yello-500': circleIndicator === 'warning',
            })}
          />
        </div>
        {isDividerVisible && !isLastNode && (
          <div className='h-full w-[1px] bg-neutral-200' />
        )}
      </div>
      <div className='mb-8 flex flex-col gap-4'>
        <div className='inline-flex max-w-max whitespace-nowrap rounded border border-neutral-200 px-1.5 py-0.5 text-sm text-muted-foreground'>
          {textRequestProgress}
        </div>
        <div className='flex flex-col gap-2'>{slotProgress}</div>
      </div>
    </div>
  );
}
