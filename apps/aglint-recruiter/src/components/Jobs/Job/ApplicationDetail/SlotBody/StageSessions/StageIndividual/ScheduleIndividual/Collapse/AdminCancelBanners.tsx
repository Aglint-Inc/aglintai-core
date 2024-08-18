import { getFullName } from '@aglint/shared-utils';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GlobalBanner } from '@/devlink2/GlobalBanner';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

import {
  setIsScheduleNowOpen,
  setStepScheduling,
} from '../../../SchedulingDrawer/store';
import {
  SchedulingApplication,
  setRescheduleSessionIds
} from '../../../store';

function CancelBanners({
  cancelReasons,
  currentSession,
}: {
  cancelReasons: SchedulingApplication['initialSessions'][0]['cancel_reasons'];
  currentSession: SchedulingApplication['initialSessions'][0];
}) {
  const { recruiterUser } = useAuthDetails();
  const adminCancel = cancelReasons?.filter(
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
                <ButtonSolid
                  size={'1'}
                  textButton={'Reschedule Now'}
                  onClickButton={{
                    onClick: (e) => {
                      e.stopPropagation();
                      setIsScheduleNowOpen(true);
                      setRescheduleSessionIds([
                        currentSession.interview_session.id,
                      ]);
                      setStepScheduling('reschedule');
                    },
                  }}
                />
              </>
            }
          />
        );
      })}
    </>
  );
}

export default CancelBanners;
