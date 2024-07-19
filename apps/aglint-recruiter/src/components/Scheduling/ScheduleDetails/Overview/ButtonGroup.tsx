import React, { Dispatch } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';

import { ScheduleMeeting } from '../types';

function ButtonGroup({
  setIsCancelOpen,
  schedule,
  isMeetingJobHiringTeam,
  setIsRescheduleOpen,
}: {
  setIsCancelOpen: Dispatch<React.SetStateAction<boolean>>;
  schedule: ScheduleMeeting;
  isMeetingJobHiringTeam: boolean;
  setIsRescheduleOpen: Dispatch<React.SetStateAction<boolean>>;
}) {
  const { checkPermissions } = useRolesAndPermissions();

  // if logged in user is an interviewer in this session

  const isCancelButtonVisible =
    (checkPermissions(['scheduling_actions']) || isMeetingJobHiringTeam) &&
    schedule?.interview_meeting?.status === 'confirmed';

  //if logged in user is hiring team or having scheduler_update permission
  const isRescheduleButtonVisible =
    (isMeetingJobHiringTeam || checkPermissions(['scheduling_actions'])) &&
    schedule?.interview_meeting?.status === 'confirmed';

  return (
    <>
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
