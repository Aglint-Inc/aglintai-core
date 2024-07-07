import React, { Dispatch } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';

import { useScheduleDetails } from '../hooks';
import { ScheduleMeeting } from '../types';

function ButtonGroup({
  setIsRequestRescheduleOpen,
  setIsCancelOpen,
  schedule,
  cancelReasons,
  isMeetingJobHiringTeam,
  setIsRescheduleOpen,
}: {
  setIsRequestRescheduleOpen: Dispatch<React.SetStateAction<boolean>>;
  setIsCancelOpen: Dispatch<React.SetStateAction<boolean>>;
  schedule: ScheduleMeeting;
  cancelReasons: ReturnType<typeof useScheduleDetails>['data']['cancel_data'];
  isMeetingJobHiringTeam: boolean;
  setIsRescheduleOpen: Dispatch<React.SetStateAction<boolean>>;
}) {
  const { recruiterUser } = useAuthDetails();
  const { checkPermissions } = useRolesAndPermissions();

  // if logged in user is an interviewer in this session
  const isRequestRescheduleButtonVisible =
    schedule?.users?.find(
      (user) =>
        user.interview_session_relation.is_confirmed &&
        user.email === recruiterUser.email &&
        user.interview_session_relation.training_type === 'qualified',
    ) &&
    !cancelReasons?.some(
      (item) =>
        item.recruiter_user.id === recruiterUser.user_id &&
        !item.interview_session_cancel.is_resolved,
    ) &&
    schedule?.interview_meeting?.status === 'confirmed';
  // if logged in user is an interviewer in this session

  const isCancelButtonVisible =
    (checkPermissions(['scheduler_create']) || isMeetingJobHiringTeam) &&
    schedule?.interview_meeting?.status === 'confirmed';

  //if logged in user is hiring team or having scheduler_update permission
  const isRescheduleButtonVisible =
    (isMeetingJobHiringTeam || checkPermissions(['scheduler_update'])) &&
    schedule?.interview_meeting?.status === 'confirmed';

  return (
    <>
      {isRequestRescheduleButtonVisible && (
        <ButtonSoft
          color={'accent'}
          size={1}
          textButton={'Request Reschedule'}
          onClickButton={{
            onClick: () => {
              setIsRequestRescheduleOpen(true);
            },
          }}
        />
      )}

      {isCancelButtonVisible && (
        <ButtonSoft
          color={'neutral'}
          size={1}
          textButton={'Cancel Schedule'}
          onClickButton={{
            onClick: () => {
              setIsCancelOpen(true);
            },
          }}
        />
      )}

      {isRescheduleButtonVisible && (
        <ButtonSoft
          color={'accent'}
          size={1}
          textButton={'Reschedule'}
          onClickButton={{
            onClick: () => {
              setIsRescheduleOpen(true);
            },
          }}
        />
      )}
    </>
  );
}

export default ButtonGroup;
