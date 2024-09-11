import React from 'react';

import UITypography from '@/components/Common/UITypography';

export function InterviewModuleTable({
  as: Component = 'div',
  slotInterviewModuleCard,
  slotFilter,
  isFilterVisible = true,
}: {
  as?: React.ElementType;
  slotInterviewModuleCard?: React.ReactNode;
  slotFilter?: React.ReactNode;
  isFilterVisible?: boolean;
}) {
  return (
    <Component className='flex w-full h-full flex-col '>
      {isFilterVisible && (
        <div className='px-4 p-2 flex w-full  justify-start items-center gap-4 border-t border-transparent'>
          {slotFilter}
        </div>
      )}
      <div className='grid grid-cols-[39.8%_15%_25%_20%] border-y border-neutral-200 bg-neutral-100'>
        <div className='p-2 px-4'>
          <UITypography>Name</UITypography>
        </div>
        <div className='p-2 px-4'>
          <UITypography>Department</UITypography>
        </div>
        <div className='p-2 px-4'>
          <UITypography>Schedules</UITypography>
        </div>
        <div className='p-2 px-4'>
          <UITypography>Members</UITypography>
        </div>
      </div>
      <div className='flex flex-col overflow-auto h-[calc(100vh-134px)]'>
        {slotInterviewModuleCard}
      </div>
    </Component>
  );
}
