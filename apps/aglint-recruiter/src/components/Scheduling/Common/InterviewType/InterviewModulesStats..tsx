import React from 'react';

import UITypography from '@/components/Common/UITypography';

export function InterviewModuleStats({
  slotInterviewModuleStatsCard,
  onClickViewAllModules,
  isViewAllVisible = true,
}) {
  return (
    <div className='h-[296px] overflow-hidden rounded-md border border-neutral-200 bg-white'>
      <div className='flex h-10 items-center justify-between rounded-t-lg border-b border-neutral-200 bg-neutral-50 px-4 py-2'>
        <UITypography type='small'>Interview Type</UITypography>
        {isViewAllVisible && (
          <div
            className='cursor-pointer text-primary underline transition-opacity hover:opacity-80'
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
        <div className='h-[347px] overflow-auto'>
          {slotInterviewModuleStatsCard}
        </div>
      </div>
    </div>
  );
}
