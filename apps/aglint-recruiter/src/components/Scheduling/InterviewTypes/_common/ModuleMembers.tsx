'use client';

import UITypography from '@/components/Common/UITypography';

export function ModuleMembers({
  as: _Component = 'div', // Default to 'div' for Tailwind
  slotQualifiedMemberList,
  slotMembersInTraining,
  isMembersTrainingVisible = true,
}) {
  return (
    <div className='flex flex-col w-[900px] p-4 space-y-4'>
      <div>
        <div className='flex items-center space-x-2'>
          <UITypography type='small' className='font-semibold' variant='p'>
            Interviewers
          </UITypography>
        </div>
        <div className='flex flex-col mt-4 space-y-2'>
          {slotQualifiedMemberList}
        </div>
      </div>
      {isMembersTrainingVisible ? (
        <div>
          <div className='flex items-center space-x-2'>
            <UITypography type='small' variant='p'>
              Members in training
            </UITypography>
          </div>
          <div className='flex flex-col mt-4 space-y-2'>
            {slotMembersInTraining}
          </div>
        </div>
      ) : null}
    </div>
  );
}
