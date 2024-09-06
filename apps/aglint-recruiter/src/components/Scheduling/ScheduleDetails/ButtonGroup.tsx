import React, { type Dispatch } from 'react';

import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';

import { useScheduleDetails } from './hooks';

function ButtonGroup({
  setIsCancelOpen,
  isMeetingJobHiringTeam,
}: {
  setIsCancelOpen: Dispatch<React.SetStateAction<boolean>>;
  isMeetingJobHiringTeam: boolean;
}) {
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
      {/* {checkPermissions(['scheduling_actions']) && (
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
      )} */}
    </>
  );
}

export default ButtonGroup;
