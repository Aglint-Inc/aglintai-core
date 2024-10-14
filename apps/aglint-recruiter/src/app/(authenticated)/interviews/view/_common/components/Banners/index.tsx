import { UIAlert } from '@components/ui-alert';
import { Calendar } from 'lucide-react';

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
          type='info'
          title='You are invited for this interview'
          icon={Calendar}
          className='mt-2'
          action={
            <>
              {isDeclineVisible && (
                <UIButton
                  variant='outline'
                  size='sm'
                  onClick={() => {
                    setIsDeclineDialogOpen(true);
                  }}
                  className='mr-2 text-black'
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
                   className='mr-2'
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
