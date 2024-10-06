import Typography from '@components/typography';
import { cn } from '@lib/utils';

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
        <Typography type='small' variant='p' fontBold='normal' className='pb-1'>
          Interview Mode
        </Typography>
        <div className={cn('flex flex-col')}>{slotInterviewModePill}</div>
      </div>
      <div className={cn('mb-4')}>
        <Typography type='small' variant='p' fontBold='normal'>
          Interviewers
        </Typography>
        <div className={cn('flex flex-col items-start')}>
          {slotInterviewersAvatarSelectionPill}
        </div>
        {isInterviewerDropVisible && (
          <div className={cn('mt-2 flex flex-col items-start')}>
            {slotInterviewersDropdown ?? (
              <div className={cn('rounded border p-2')}>
                <div>{'Search Interviewers'}</div>
              </div>
            )}  
          </div>
        )}
        {isPanel && (
          <div className='mt-2 flex flex-row items-center space-x-2 text-sm'>
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
            <Typography fontBold='default' type='small'>
              {textToggleLabel}
            </Typography>
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
