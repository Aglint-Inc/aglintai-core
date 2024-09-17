'use client';
import React from 'react';

import UITypography from '@/components/Common/UITypography';

export function AllInterviewers({ slotAllInterviewesCard }) {
  return (
    <div className='all-interviewers-wrapp'>
      <div className='all-interviewers-header-wrap decrease-grid grid h-[38px] grid-cols-[25%_12%_12%_25%_26%] border-[1px] bg-neutral-100'>
        <div className='flex items-center justify-start p-2'>
          <UITypography variant='h2' type='small' className='font-semibold'>
            Interviewer
          </UITypography>
        </div>
        <div className='center flex items-center justify-center p-2'>
          <UITypography variant='p' type='small' className='font-semibold'>
            Upcoming
          </UITypography>
        </div>
        <div className='center flex items-center justify-center p-2'>
          <UITypography variant='p' type='small' className='font-semibold'>
            Completed
          </UITypography>
        </div>
        <div className='flex items-center justify-start p-2'>
          <UITypography variant='p' type='small' className='font-semibold'>
            Qualified
          </UITypography>
        </div>
        <div className='flex items-center justify-start p-2'>
          <UITypography variant='p' type='small' className='font-semibold'>
            Training
          </UITypography>
        </div>
      </div>
      <div className='all-interviewers-body h-[calc(100vh-138px)] overflow-auto'>
        {slotAllInterviewesCard}
      </div>
    </div>
  );
}
