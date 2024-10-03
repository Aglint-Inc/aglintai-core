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
}: any) {
  return (
    <div className={cn('rounded-lg')}>
      <div className={cn('mb-4')}>
        <UITypography
          type='small'
          variant='p'
          fontBold='normal'
          className='pb-1'
        >
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
          <div className='mt-2 flex flex-row items-center space-x-2'>
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
          <div className={cn('mt-2 text-sm text-gray-600')}>
            {'One chosen member will serve as the interviewer.'}
          </div>
        )}
      </div>
      {isTrainingVisible && (
        <div className={cn('mb-4')}>
          <div className={cn('flex items-center space-x-2')}>
            <div>{slotToggle}</div>
            <UITypography fontBold='default' type='small'>
              {textToggleLabel}
            </UITypography>
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
