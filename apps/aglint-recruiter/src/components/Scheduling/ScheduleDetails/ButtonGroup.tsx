import { useRouter } from 'next/router';
import React, { Dispatch } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';
import ROUTES from '@/src/utils/routing/routes';

import { useScheduleDetails } from './hooks';

function ButtonGroup({
  setIsCancelOpen,
  isMeetingJobHiringTeam,
}: {
  setIsCancelOpen: Dispatch<React.SetStateAction<boolean>>;
  isMeetingJobHiringTeam: boolean;
}) {
  const router = useRouter();
  const { checkPermissions } = useRolesAndPermissions();
  const { data } = useScheduleDetails();
  const schedule = data?.schedule_data;

  const isCancelButtonVisible =
    (checkPermissions(['scheduling_actions']) || isMeetingJobHiringTeam) &&
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
      {checkPermissions(['scheduling_actions']) && (
        <ButtonSoft
          size={1}
          textButton={'Application Detail'}
          onClickButton={{
            onClick: () => {
              router.push(
                ROUTES['/jobs/[id]/application/[application_id]']({
                  id: schedule?.job.id,
                  application_id: schedule?.application_id,
                }) + `?tab=interview`,
              );
            },
          }}
        />
      )}
    </>
  );
}

export default ButtonGroup;
