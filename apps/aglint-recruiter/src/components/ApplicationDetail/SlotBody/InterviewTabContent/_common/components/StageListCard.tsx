'use client';

import { cn } from '@lib/utils';
import React from 'react';

import UITypography from '@/components/Common/UITypography';

interface PipelineTabProps {
  color?: 'neutral' | 'info' | 'success' | 'warning' | 'danger';
  textStageName?: string;
  textProgress?: string;
  isActive?: boolean;
  onClickTab?: () => void;
  slotIcon?: React.ReactNode;
}

export function StageListCard({
  color = 'neutral',
  textStageName = 'Stage 2 HR round',
  textProgress = 'This is a global text component',
  isActive = false,
  onClickTab,
  slotIcon,
}: PipelineTabProps) {
  return (
    <div
      className={cn(
        'relative flex w-full h-16 items-stretch cursor-pointer',
        isActive && 'z-10',
      )}
      onClick={onClickTab}
    >
      <div
        className={cn(
          'relative z-10 flex w-full px-4 flex-col justify-center gap-1.5 rounded-lg',
          {
            'bg-neutral-100 text-neutral-800': color === 'neutral',
            'bg-sky-100 text-sky-800': color === 'info',
            'bg-green-100 text-green-800': color === 'success',
            'bg-yellow-100 text-yellow-800': color === 'warning',
            'bg-red-100 text-red-800': color === 'danger',
          },
        )}
      >
        <UITypography variant='h6' className='font-semibold capitalize'>
          {textStageName}
        </UITypography>
        <div className='flex items-center gap-1'>
          {slotIcon}
          <UITypography variant='small'>{textProgress}</UITypography>
        </div>
      </div>
      {isActive && (
        <div className='absolute right-[-20px] top-0 bottom-0 w-10 overflow-hidden'>
          <div
            className={cn('h-full w-[34px]', {
              'text-neutral-100': color === 'neutral',
              'text-sky-100': color === 'info',
              'text-green-100': color === 'success',
              'text-yellow-100': color === 'warning',
              'bg-error': color === 'danger',
            })}
          >
            <svg
              width='34'
              height='66'
              viewBox='0 0 34 66'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M0 0L34 32.4469L0 66V0Z' fill='currentColor' />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}