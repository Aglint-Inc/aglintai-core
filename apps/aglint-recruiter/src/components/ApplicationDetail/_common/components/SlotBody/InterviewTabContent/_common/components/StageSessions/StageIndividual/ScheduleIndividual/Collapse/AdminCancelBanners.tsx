import { getFullName } from '@aglint/shared-utils';
import { GlobalBanner } from '@devlink2/GlobalBanner';

import { UIButton } from '@/components/Common/UIButton';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { type StageWithSessions } from '@/queries/application';

function CancelBanners({
  session,
}: {
  session: StageWithSessions[0]['sessions'][0];
}) {
  const { recruiterUser } = useAuthDetails();
  const adminCancel = session.cancel_reasons?.filter(
    (reason) => reason.interview_session_cancel.cancel_user_id,
  );

  return (
    <>
      {adminCancel.map((cancel) => {
        return (
          <GlobalBanner
            key={cancel.interview_session_cancel.id}
            color={'error'}
            textTitle={`${cancel.recruiter_user.user_id === recruiterUser.user_id ? 'You have' : getFullName(cancel.recruiter_user.first_name, cancel.recruiter_user.last_name)} cancelled this schedule`}
            textDescription={`Reason: ${cancel.interview_session_cancel.reason}`}
            textNotes={cancel.interview_session_cancel.other_details?.note}
            isDescriptionVisible={Boolean(
              cancel.interview_session_cancel.reason,
            )}
            isAdditionalNotes={Boolean(
              cancel.interview_session_cancel.other_details?.note,
            )}
            iconName={'event_busy'}
            slotButtons={
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
          />
        );
      })}
    </>
  );
}

export default CancelBanners;
