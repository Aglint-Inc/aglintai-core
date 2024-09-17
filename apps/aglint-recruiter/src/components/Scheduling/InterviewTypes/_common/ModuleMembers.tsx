'use client';

import UITypography from '@/components/Common/UITypography';

export function ModuleMembers({
  as: _Component = 'div', // Default to 'div' for Tailwind
  slotQualifiedMemberList,
  slotMembersInTraining,
  isMembersTrainingVisible = true,
}) {
  return (
    <div className='flex w-[900px] flex-col space-y-4 p-4'>
      <div>
        <div className='flex items-center space-x-2'>
          <UITypography type='small' className='font-semibold' variant='p'>
            Interviewers
          </UITypography>
        </div>
        <div className='mt-4 flex flex-col space-y-2'>
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
          <div className='mt-4 flex flex-col space-y-2'>
            {slotMembersInTraining}
          </div>
        </div>
      ) : null}
    </div>
  );
}
