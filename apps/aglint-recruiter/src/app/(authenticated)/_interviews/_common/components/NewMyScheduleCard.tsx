'use client';
import React from 'react';

import UITypography from '@/components/Common/UITypography';

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
              <UITypography variant='p' type='small'>
                {textMonth}
              </UITypography>
              <UITypography variant='p' type='xxxLarge'>
                {textDate}
              </UITypography>
              <UITypography variant='p' type='small'>
                {textDay}
              </UITypography>
            </div>
          </div>
          {isNotScheduledIconVisible && (
            <div className='absolute inset-0 z-10 bg-neutral-500'>
              <div className='flex flex-col items-center justify-center gap-2'>
                <div className='flex flex-col items-center justify-center'>
                  <svg
                    width='36'
                    height='36'
                    viewBox='0 0 36 36'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M10.5 6.75V9H19.5V6.75C19.5312 6.28125 19.7812 6.03125 20.25 6C20.7188 6.03125 20.9688 6.28125 21 6.75V9H22.5C23.3438 9.03125 24.0469 9.32812 24.6094 9.89062C25.1719 10.4531 25.4688 11.1562 25.5 12V13.5V15H24.75H24H21H6V27C6 27.4375 6.14062 27.7969 6.42188 28.0781C6.70312 28.3594 7.0625 28.5 7.5 28.5H18.375C18.8438 29.0625 19.3906 29.5625 20.0156 30H7.5C6.65625 29.9688 5.95312 29.6719 5.39062 29.1094C4.82812 28.5469 4.53125 27.8438 4.5 27V15V13.5V12C4.53125 11.1562 4.82812 10.4531 5.39062 9.89062C5.95312 9.32812 6.65625 9.03125 7.5 9H9V6.75C9.03125 6.28125 9.28125 6.03125 9.75 6C10.2188 6.03125 10.4688 6.28125 10.5 6.75ZM7.5 10.5C7.0625 10.5 6.70312 10.6406 6.42188 10.9219C6.14062 11.2031 6 11.5625 6 12V13.5H24V12C24 11.5625 23.8594 11.2031 23.5781 10.9219C23.2969 10.6406 22.9375 10.5 22.5 10.5H7.5ZM19.5 23.25C19.5 24.1875 19.7344 25.0625 20.2031 25.875C20.6719 26.6875 21.3125 27.3281 22.125 27.7969C22.9375 28.2656 23.8125 28.5 24.75 28.5C25.6875 28.5 26.5625 28.2656 27.375 27.7969C28.1875 27.3281 28.8281 26.6875 29.2969 25.875C29.7656 25.0625 30 24.1875 30 23.25C30 22.3125 29.7656 21.4375 29.2969 20.625C28.8281 19.8125 28.1875 19.1719 27.375 18.7031C26.5625 18.2344 25.6875 18 24.75 18C23.8125 18 22.9375 18.2344 22.125 18.7031C21.3125 19.1719 20.6719 19.8125 20.2031 20.625C19.7344 21.4375 19.5 22.3125 19.5 23.25ZM31.5 23.25C31.5 24.4688 31.2031 25.5938 30.6094 26.625C30.0156 27.6562 29.1875 28.4844 28.125 29.1094C27.0625 29.7031 25.9375 30 24.75 30C23.5625 30 22.4375 29.7031 21.375 29.1094C20.3125 28.4844 19.4844 27.6562 18.8906 26.625C18.2969 25.5938 18 24.4688 18 23.25C18 22.0312 18.2969 20.9062 18.8906 19.875C19.4844 18.8438 20.3125 18.0156 21.375 17.3906C22.4375 16.7969 23.5625 16.5 24.75 16.5C25.9375 16.5 27.0625 16.7969 28.125 17.3906C29.1875 18.0156 30.0156 18.8438 30.6094 19.875C31.2031 20.9062 31.5 22.0312 31.5 23.25ZM25.5 20.25V22.5H27.75C28.2188 22.5312 28.4688 22.7812 28.5 23.25C28.4688 23.7188 28.2188 23.9688 27.75 24H25.5V26.25C25.4688 26.7188 25.2188 26.9688 24.75 27C24.2812 26.9688 24.0312 26.7188 24 26.25V24H21.75C21.2812 23.9688 21.0312 23.7188 21 23.25C21.0312 22.7812 21.2812 22.5312 21.75 22.5H24V20.25C24.0312 19.7812 24.2812 19.5312 24.75 19.5C25.2188 19.5312 25.4688 19.7812 25.5 20.25Z'
                      fill='currentColor'
                    />
                  </svg>
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
