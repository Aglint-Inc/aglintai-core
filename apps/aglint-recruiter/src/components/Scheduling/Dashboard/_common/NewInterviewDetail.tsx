'use client';
import { cn } from '@lib/utils';
import React from 'react';

import UITypography from '@/components/Common/UITypography';

interface NewInterviewDetailProps {
  as?: React.ElementType;
  slotInterviewDetailPill?: React.ReactNode;
  slotDropdownButton?: React.ReactNode;
  textHeading?: React.ReactNode;
}

export function NewInterviewDetail({
  slotInterviewDetailPill,
  slotDropdownButton,
  textHeading = 'Interviews Detail',
}: NewInterviewDetailProps) {
  return (
    <div
      className={cn(
        'flex h-full flex-col items-start justify-start rounded-lg border-[1px] bg-white',
      )}
    >
      <div className='flex h-10 w-full items-center justify-between px-4 py-2'>
        <UITypography variant='p' type='small'>
          {textHeading}
        </UITypography>
        <div>{slotDropdownButton}</div>
      </div>
      <div className='flex h-full w-full flex-col gap-5 overflow-auto p-4'>
        {slotInterviewDetailPill}
      </div>
    </div>
  );
}
