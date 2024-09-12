import React from 'react';

import UITypography from '@/components/Common/UITypography';

export function InterviewModuleStats({
  slotInterviewModuleStatsCard,
  onClickViewAllModules,
  isViewAllVisible = true,
}) {
  return (
    <div className='overflow-hidden h-[296px] border border-neutral-200 rounded-md bg-white'>
      <div className='flex h-10 px-4 py-2 justify-between items-center border-b border-neutral-200 rounded-t-lg bg-neutral-50'>
        <UITypography type='small'>Interview Type</UITypography>
        {isViewAllVisible && (
          <div
            className='text-primary underline cursor-pointer hover:opacity-80 transition-opacity'
            {...onClickViewAllModules}
          >
            View all
          </div>
        )}
      </div>
      <div className='relative'>
        <div className='sticky top-0 z-10 grid h-[33px] grid-cols-[60%_20%_20%] border-b border-neutral-100 bg-white'>
          <div className='p-2 px-4'>
            <UITypography type='small'>Interview Type</UITypography>
          </div>
          <div className='p-2 px-4'>
            <UITypography type='small'>Qualified</UITypography>
          </div>
          <div className='p-2 px-4'>
            <UITypography type='small'>Training</UITypography>
          </div>
        </div>
        <div className='overflow-auto h-[347px]'>
          {slotInterviewModuleStatsCard}
        </div>
      </div>
    </div>
  );
}
