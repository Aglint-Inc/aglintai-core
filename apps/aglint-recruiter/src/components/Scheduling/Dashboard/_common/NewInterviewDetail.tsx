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
        'flex h-full flex-col justify-start items-start rounded-lg bg-white border-[1px]',
      )}
    >
      <div className='flex w-full h-10 px-4 py-2 justify-between items-center'>
        <UITypography variant='p' type='small'>
          {textHeading}
        </UITypography>
        <div>{slotDropdownButton}</div>
      </div>
      <div className='flex overflow-auto w-full h-full p-4 flex-col gap-5 '>
        {slotInterviewDetailPill}
      </div>
    </div>
  );
}
