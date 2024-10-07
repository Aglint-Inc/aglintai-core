'use client';
import Typography from '@components/typography';
import { CalendarPlus } from 'lucide-react';
import React from 'react';

type NewMyScheduleCardProps = {
  slotMyScheduleSubCard: React.ReactNode;
  textMonth?: string | React.ReactNode;
  textDate?: string;
  textDay?: string;
  isNotScheduledIconVisible?: boolean;
};

export function NewMyScheduleCard({
  slotMyScheduleSubCard,
  textMonth = 'February',
  textDate = '27',
  textDay = 'FRI',
  isNotScheduledIconVisible = false,
}: NewMyScheduleCardProps) {
  return (
    <div className={'my-schedule relative max-w-[1000px]'}>
      <div className='flex h-full items-stretch justify-start gap-4'>
        <div className='relative hidden h-full'>
          <div className='h-full w-[100px] rounded bg-neutral-200'>
            <div className='w-30 sticky top-0 flex flex-col items-center justify-start gap-1 p-3'>
              <Typography variant='p' type='small'>
                {textMonth}
              </Typography>
              <Typography variant='p' type='xxxLarge'>
                {textDate}
              </Typography>
              <Typography variant='p' type='small'>
                {textDay}
              </Typography>
            </div>
          </div>
          {isNotScheduledIconVisible && (
            <div className='absolute inset-0 z-10 bg-neutral-500'>
              <div className='flex flex-col items-center justify-center gap-2'>
                <div className='flex flex-col items-center justify-center'>
                  <CalendarPlus size={36} />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className='flex w-full flex-col gap-2'>
          {slotMyScheduleSubCard}
        </div>
      </div>
    </div>
  );
}
