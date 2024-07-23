import { useRouter } from 'next/router';
import React, { Dispatch } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';
import ROUTES from '@/src/utils/routing/routes';

import {
  setIsScheduleNowOpen,
  setStepScheduling,
} from '../CandidateDetails/SchedulingDrawer/store';
import { setRescheduleSessionIds } from '../CandidateDetails/store';
import { ScheduleMeeting } from './types';

function ButtonGroup({
  setIsCancelOpen,
  schedule,
  isMeetingJobHiringTeam,
}: {
  setIsCancelOpen: Dispatch<React.SetStateAction<boolean>>;
  schedule: ScheduleMeeting;
  isMeetingJobHiringTeam: boolean;
}) {
  const router = useRouter();
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
              setIsScheduleNowOpen(true);
              setRescheduleSessionIds([schedule.interview_session.id]);
              setStepScheduling('reschedule');
              router.push(
                ROUTES['/scheduling/application/[application_id]']({
                  application_id: schedule.schedule.application_id,
                }),
              );
            },
          }}
        />
      )}
    </>
  );
}

export default ButtonGroup;
