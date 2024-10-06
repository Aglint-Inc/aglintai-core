import { type DatabaseTable } from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';
import Typography from '@components/typography';
import { UIAlert } from '@components/ui-alert';
import { CalendarClock } from 'lucide-react';

import { useTenant } from '@/company/hooks';
import { UIButton } from '@/components/Common/UIButton';

import { type StageWithSessions } from '../../../../hooks/useInterviewStages';

function CancelBanners({
  session,
}: {
  session: NonNullable<StageWithSessions>[0]['sessions'][0];
}) {
  const { recruiter_user } = useTenant();
  const adminCancel = session.cancel_reasons?.filter(
    (reason) => reason.interview_session_cancel.cancel_user_id,
  );

  return (
    <>
      {adminCancel.map((cancel) => {
        return (
          <UIAlert
            key={cancel.interview_session_cancel.id}
            type='error'
            title={`${cancel?.recruiter_user?.user_id === recruiter_user?.user_id ? 'You have' : getFullName(cancel?.recruiter_user?.first_name ?? '', cancel?.recruiter_user?.last_name ?? '')} canceled this schedule`}
            icon={CalendarClock}
            action={
              <>
                <UIButton
                  variant='default'
                  size='sm'
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  Reschedule Now
                </UIButton>
              </>
            }
          >
            <Typography>
              {`Reason: ${cancel.interview_session_cancel.reason}`}
            </Typography>
            <Typography>
              {
                (
                  cancel.interview_session_cancel
                    .other_details as DatabaseTable['interview_session_cancel']['other_details']
                )?.note
              }
            </Typography>
          </UIAlert>
        );
      })}
    </>
  );
}

export default CancelBanners;
