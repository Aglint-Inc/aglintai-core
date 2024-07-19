import { getFullName } from '@aglint/shared-utils';
import React from 'react';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GlobalBanner } from '@/devlink2/GlobalBanner';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

import { useScheduleDetails } from '../../hooks';

function AdminCancel({
  item,
  onClickReschedule,
}: {
  item: ReturnType<typeof useScheduleDetails>['data']['cancel_data'][0];
  onClickReschedule: (
    // eslint-disable-next-line no-unused-vars
    item: ReturnType<typeof useScheduleDetails>['data']['cancel_data'][0],
  ) => void;
}) {
  const { recruiterUser } = useAuthDetails();
  return (
    <GlobalBanner
      key={item.interview_session_cancel.id}
      color={'error'}
      textTitle={`${item.recruiter_user.id === recruiterUser.user_id ? 'You have' : getFullName(item.recruiter_user.first_name, item.recruiter_user.last_name)} cancelled this schedule`}
      textDescription={`Reason: ${item.interview_session_cancel.reason}`}
      textNotes={item.interview_session_cancel.other_details?.note}
      isDescriptionVisible={Boolean(item.interview_session_cancel.reason)}
      isAdditionalNotes={Boolean(
        item.interview_session_cancel.other_details?.note,
      )}
      iconName={'event_busy'}
      slotButtons={
        <>
          <ButtonSolid
            size={'1'}
            textButton={'Reschedule Now'}
            onClickButton={{
              onClick: () => {
                onClickReschedule(item);
              },
            }}
          />
        </>
      }
    />
  );
}

export default AdminCancel;
