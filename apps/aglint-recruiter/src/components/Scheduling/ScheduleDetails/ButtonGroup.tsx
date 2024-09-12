
import React, { type Dispatch } from 'react';

import { UIButton } from '@/components/Common/UIButton';
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
        <UIButton
          variant='secondary'
          size='sm'
          onClick={() => {
            setIsCancelOpen(true);
          }}
        >
          Cancel Schedule
        </UIButton>
      )}
      {/* {checkPermissions(['scheduling_actions']) && (
        <ButtonSoft
          size={1}
          textButton={'Application Detail'}
          onClickButton={{
            onClick: () => {
              router.push(
                ROUTES['/jobs/[job]/application/[application_id]']({
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
