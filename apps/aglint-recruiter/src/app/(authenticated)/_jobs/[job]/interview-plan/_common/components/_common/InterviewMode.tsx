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
        <UITypography type='small' variant='p' fontBold='default'>
          Interview Mode
        </UITypography>
        <div className={cn('flex flex-col')}>{slotInterviewModePill}</div>
      </div>
      <div className={cn('mb-4')}>
        <UITypography type='small' variant='p' fontBold='default'>
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
          <div className={cn('mt-4')}>
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
          <div className={cn('mt-2 text-gray-600')}>
            {'One chosen member will serve as the interviewer.'}
          </div>
        )}
      </div>
      {isTrainingVisible && (
        <div className={cn('mb-4')}>
          <div className={cn('flex items-center')}>
            <div>{slotToggle}</div>
            <UITypography fontBold='default'>{textToggleLabel}</UITypography>
          </div>
          {isTraining && (
            <div className={cn('mt-2')}>
              <div className={cn('flex flex-col')}>
                {slotTraineeAvatarSelectionPill}
              </div>
              {isTraineesDropVisible && (
                <div className={cn('mt-2')}>
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
