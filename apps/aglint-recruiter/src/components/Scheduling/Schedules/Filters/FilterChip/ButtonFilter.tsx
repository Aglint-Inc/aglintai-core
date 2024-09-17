'use client';
import { cn } from '@lib/utils';
import React from 'react';

import UITypography from '@/components/Common/UITypography';

interface ButtonFilterProps {
  as?: React.ElementType;
  onClickStatus?: any;
  slotLeftIcon?: React.ReactNode;
  slotRightIcon?: React.ReactNode;
  textLabel?: React.ReactNode;
  isDotVisible?: boolean;
  isActive?: boolean;
  fontSize?: string;
}

export function ButtonFilter({
  onClickStatus = {},
  slotLeftIcon,
  slotRightIcon,
  textLabel = 'Status',
  isDotVisible = false,
  isActive = true,
}: ButtonFilterProps) {
  return (
    <div
      className={cn(
        'duration-250 ease relative flex cursor-pointer items-center gap-1 rounded-md border border-neutral-500 bg-white p-2 transition-all',
        { 'opacity-80': isActive },
      )}
      {...onClickStatus}
    >
      <div className='relative flex items-center justify-center'>
        {slotLeftIcon}
      </div>
      <div className='relative'>
        <UITypography variant='p' type='small'>
          {textLabel}
        </UITypography>
      </div>
      <div className='relative flex items-center justify-center'>
        {slotRightIcon}
      </div>
      {isDotVisible && (
        <div className='z-3 absolute right-[-5px] top-[-5px] h-2.5 w-2.5 rounded-full bg-yellow-500' />
      )}
      {isActive && (
        <div className='absolute inset-0 rounded-md bg-neutral-200' />
      )}
    </div>
  );
}
