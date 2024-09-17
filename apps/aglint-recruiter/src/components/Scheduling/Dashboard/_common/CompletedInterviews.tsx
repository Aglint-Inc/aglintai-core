'use client';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import React from 'react';

import UITypography from '@/components/Common/UITypography';

interface CompletedInterviewsProps {
  as?: React.ElementType;
  slotGraph?: React.ReactNode;
  textMonth?: React.ReactNode;
  textLastDays?: React.ReactNode;
  onClickLastMonth?: () => void;
  onClickLastDays?: () => void;
  isLastMonthsActive?: boolean;
  isLastDaysActive?: boolean;
  textLastQuarter?: React.ReactNode;
  onClickLastQuarter?: () => void;
  isLastQuarterActive?: boolean;
}

export function CompletedInterviewsNew({
  slotGraph,
  textMonth = 'Last 8 months',
  textLastDays = 'Last 30 days',
  onClickLastMonth,
  onClickLastDays,
  isLastMonthsActive = false,
  isLastDaysActive = false,
  textLastQuarter = 'Last 8 months',
  onClickLastQuarter,
  isLastQuarterActive = false,
}: CompletedInterviewsProps) {
  const value = isLastMonthsActive
    ? 'month'
    : isLastDaysActive
      ? 'day'
      : isLastQuarterActive
        ? 'quater'
        : '';
  return (
    <div className='flex flex-col p-4 space-y-4 rounded-lg bg-white border-[1px]'>
      <div className='flex justify-between items-center'>
        <UITypography variant='p' type='small'>
          Completed Interviews
        </UITypography>
        <div className='flex space-x-2'>
          <Tabs defaultValue={value} value={value} className='h-[30px]'>
            <TabsList className='p-0 px-2 h-[30px]'>
              <TabsTrigger
                value='month'
                onClick={onClickLastMonth}
                className='p-0 px-2 text-[12px]'
              >
                {textMonth}
              </TabsTrigger>
              <TabsTrigger
                value='quater'
                onClick={onClickLastQuarter}
                className='p-0 px-2 text-[12px]'
              >
                {textLastQuarter}
              </TabsTrigger>
              <TabsTrigger
                value='day'
                onClick={onClickLastDays}
                className='p-0 px-2 text-[12px]'
              >
                {textLastDays}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div>{slotGraph}</div>
    </div>
  );
}
