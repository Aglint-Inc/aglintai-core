'use client';
import React from 'react';

import UITypography from '@/components/Common/UITypography';

interface TimeRangeSelectorProps {
  as?: React.ElementType;
  textDay?: React.ReactNode;
  isMultiDay?: boolean;
  slotSelectedTime?: React.ReactNode;
  slotTimeinputs?: React.ReactNode;
  slotButton?: React.ReactNode;
}

export function TimeRangeSelector({
  as: Component = 'div',
  textDay = 'Day 1',
  isMultiDay = true,
  slotSelectedTime,
  slotTimeinputs,
  slotButton,
}: TimeRangeSelectorProps) {
  return (
    <Component className='flex flex-col gap-4'>
      {isMultiDay && (
        <div>
          <UITypography variant='p' type='small'>
            {textDay}
          </UITypography>
        </div>
      )}
      <div className='mb-1'>{slotSelectedTime}</div>
      <div className='flex gap-4'>
        <div className='w-full grid grid-cols-2 gap-4'>{slotTimeinputs}</div>
        <div>{slotButton}</div>
      </div>
    </Component>
  );
}
