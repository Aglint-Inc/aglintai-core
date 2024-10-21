import { UIBadge } from '@components/ui-badge';
import { cn } from '@lib/utils';
import React from 'react';

interface RequestProgressProps {
  circleIndicator?: 'success' | 'destructive' | 'neutral' | 'info' | 'warning';
  textRequestProgress: string;
  slotProgress?: React.ReactNode;
  isDividerVisible?: boolean;
  isLastNode?: boolean;
}

export function RequestProgressTracker({
  circleIndicator = 'neutral',
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
              'bg-neutral-300': circleIndicator === 'neutral',
              'bg-green-500': circleIndicator === 'success',
              'bg-red-500': circleIndicator === 'destructive',
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
        <UIBadge variant={circleIndicator} textBadge={textRequestProgress} />
        {/* <div
          className={cn(
            'borde inline-flex max-w-max whitespace-nowrap rounded px-3 py-0.5 text-sm',
            {
              'bg-gray-100 text-muted-foreground':
                circleIndicator === 'default',
              'bg-green-100 text-green-800': circleIndicator === 'success',
              'bg-red-100 text-red-800': circleIndicator === 'error',
              'bg-blue-100 text-blue-800': circleIndicator === 'info',
              'bg-yellow-100 text-yellow-800': circleIndicator === 'warning',
            },
          )}
        >
          {textRequestProgress}
        </div> */}

        <div className='flex flex-col gap-2'>{slotProgress}</div>
      </div>
    </div>
  );
}
