'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import React from 'react';

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
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle>Completed Interviews</CardTitle>
        <Tabs defaultValue={value} value={value} className='h-[30px]'>
          <TabsList className='h-[30px] p-0 px-2'>
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
      </CardHeader>
    </Card>
  );
}
