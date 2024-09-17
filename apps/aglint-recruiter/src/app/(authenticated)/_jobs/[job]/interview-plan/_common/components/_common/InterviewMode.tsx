import { cn } from '@lib/utils';

import UITypography from '@/components/Common/UITypography';

export function InterviewMode({
  slotInterviewModePill,
  slotInterviewersAvatarSelectionPill,
  slotInterviewersDropdown,
  isPanel = false,
  slotMemberCountDropdown,
  isIndividual = false,
  slotToggle,
  textToggleLabel = 'Training Off',
  isTraining = false,
  slotTraineeAvatarSelectionPill,
  slotTraineesDropdown,
  isInterviewerDropVisible = true,
  isTrainingVisible = true,
  isTraineesDropVisible = true,
}) {
  return (
    <div className={cn('rounded-lg')}>
      <div className={cn('mb-4')}>
        <UITypography type='small' variant='p' fontBold='normal' className='pb-1'>
          Interview Mode
        </UITypography>
        <div className={cn('flex flex-col')}>{slotInterviewModePill}</div>
      </div>
      <div className={cn('mb-4')}>
        <UITypography type='small' variant='p' fontBold='normal'>
          Interviewers
        </UITypography>
        <div className={cn('flex flex-col')}>
          {slotInterviewersAvatarSelectionPill}
        </div>
        {isInterviewerDropVisible && (
          <div className={cn('mt-2')}>
            {slotInterviewersDropdown ?? (
              <div className={cn('rounded border p-2')}>
                <div>{'Search Interviewers'}</div>
              </div>
            )}
          </div>
        )}
        {isPanel && (
          <div className='flex flex-row mt-2 space-x-2 items-center'> 
            <div>{'Include'}</div>
            <div>
              {slotMemberCountDropdown ?? (
                <div className={cn('rounded border p-2')}>
                  <div>{'2'}</div>
                </div>
              )}
            </div>
            <div>{'of selected members'}</div>
         </div>
        )}
        {isIndividual && (
          <div className={cn('mt-2 text-gray-600 text-sm')}>
            {'One chosen member will serve as the interviewer.'}
          </div>
        )}
      </div>
      {isTrainingVisible && (
        <div className={cn('mb-4')}>
          <div className={cn('flex items-center space-x-2')}>
            <div>{slotToggle}</div>
            <UITypography fontBold='default' type='small'>{textToggleLabel}</UITypography>
          </div>
          {isTraining && (
            <div className={cn('mt-2')}>
              <div className={cn('flex flex-col')}>
                {slotTraineeAvatarSelectionPill}
              </div>
              {isTraineesDropVisible && (
                <div>
                  {slotTraineesDropdown ?? (
                    <div className={cn('rounded border p-2')}>
                      <div>{'Search Interviewers'}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
