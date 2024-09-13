'use client';
import { Calendar, Clock } from 'lucide-react';
import React from 'react';

import UITypography from '@/components/Common/UITypography';

export function SingleDaySchedule({
  as: Component = 'div',
  textTotalTimeRange = '11:30AM - 04:00PM PST',
  slotConflicts,
  slotSessionDetails,
  textDayCount = 'Day 1',
  textDate = 'April 04',
  isMultiDay = false,
  onClickSingleDay,
}: {
  as?: React.ElementType;
  textTotalTimeRange?: string;
  slotConflicts?: React.ReactNode;
  slotSessionDetails?: React.ReactNode;
  textDayCount?: string;
  textDate?: string;
  isMultiDay?: boolean;
  onClickSingleDay?: () => void;
}) {
  return (
    <Component
      className='overflow-hidden w-full bg-white'
      onClick={onClickSingleDay}
    >
      <div className='z-10 flex p-2 justify-between items-center'>
        <div className='flex justify-start items-center gap-7'>
          {isMultiDay && (
            <div className='flex flex-row flex-nowrap gap-2 items-center'>
              <Calendar className='w-4 h-4 text-gray-600' />
              <UITypography type='small' className='font-semibold'>
                {textDayCount}
              </UITypography>
              <UITypography type='extraSmall' className='text-gray-600'>
                {textDate}
              </UITypography>
            </div>
          )}
          <div className='flex flex-row flex-nowrap gap-2 items-center'>
            <Clock className='w-4 h-4 text-gray-600' />
            <UITypography type='extraSmall' className='font-semibold'>
              {textTotalTimeRange}
            </UITypography>
          </div>
        </div>
        <div className='flex justify-start items-center gap-2'>
          <div className='flex h-7 justify-start items-center gap-2'>
            {slotConflicts}
          </div>
        </div>
      </div>
      {slotSessionDetails}
    </Component>
  );
}
