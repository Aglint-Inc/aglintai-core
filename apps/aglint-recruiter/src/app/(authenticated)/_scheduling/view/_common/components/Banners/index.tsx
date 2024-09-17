import { UIAlert } from '@/components/Common/UIAlert';
import { UIButton } from '@/components/Common/UIButton';

import { useScheduleDetails } from '../../hooks/useScheduleDetails';
import { setIsDeclineDialogOpen, useScheduleDetailsStore } from '../../stores';
import { onClickAccept } from '../../utils';
import DeclineScheduleDialog from '../DeclineScheduleDialog';

function Banners() {
  const { sessionUser } = useScheduleDetailsStore();
  const { data, refetch } = useScheduleDetails();
  const schedule = data?.schedule_data;

  const sessionRelation = sessionUser?.interview_session_relation;

  const isAcceptVisible =
    sessionRelation?.accepted_status === 'waiting' &&
    schedule.interview_meeting.status === 'confirmed' &&
    sessionRelation?.training_type === 'qualified';

  const isDeclineVisible =
    sessionRelation?.accepted_status !== 'declined' &&
    sessionRelation?.accepted_status !== 'request_reschedule' &&
    schedule.interview_meeting.status === 'confirmed' &&
    sessionRelation?.training_type === 'qualified';

  const isConfirmed = schedule.interview_meeting.status === 'confirmed';

  return (
    <div className='flex flex-col gap-4'>
      <DeclineScheduleDialog />
      {isConfirmed && (isDeclineVisible || isAcceptVisible) && (
        <UIAlert
          type='inline'
          color={'info'}
          title={'You are invited for this interview'}
          iconName={'Archive'}
          actions={
            <>
              {isDeclineVisible && (
                <UIButton
                  variant='outline'
                  size='sm'
                  onClick={() => {
                    setIsDeclineDialogOpen(true);
                  }}
                >
                  Decline
                </UIButton>
              )}

              {isAcceptVisible && (
                <UIButton
                  variant='default'
                  size='sm'
                  onClick={async () => {
                    await onClickAccept(sessionRelation.id);
                    refetch();
                  }}
                >
                  Accept
                </UIButton>
              )}
            </>
          }
        />
      )}
    </div>
  );
}

export default Banners;
