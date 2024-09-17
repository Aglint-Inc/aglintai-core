import { UIButton } from '@/components/Common/UIButton';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';

import { useScheduleDetails } from '../hooks/useScheduleDetails';
import { setIsCancelDialogOpen, useScheduleDetailsStore } from '../stores';
import CancelScheduleDialog from './CancelScheduleDialog';

function ButtonGroup() {
  const { recruiterUser } = useAuthDetails();
  const { checkPermissions } = useRolesAndPermissions();
  const { isCancelDialogOpen } = useScheduleDetailsStore();
  const { data, refetch } = useScheduleDetails();
  const schedule = data?.schedule_data;

  const isMeetingJobHiringTeam =
    schedule?.hiring_manager?.user_id === recruiterUser.user_id ||
    schedule?.organizer?.user_id === recruiterUser.user_id ||
    schedule?.recruiter?.user_id === recruiterUser.user_id;

  const isCancelButtonVisible =
    (checkPermissions(['scheduling_actions']) || isMeetingJobHiringTeam) &&
    schedule?.interview_meeting?.status === 'confirmed';

  return (
    <>
      <CancelScheduleDialog
        isDeclineOpen={isCancelDialogOpen}
        setIsDeclineOpen={setIsCancelDialogOpen}
        refetch={refetch}
        metaDetails={[
          {
            application_id: schedule.application_id,
            meeting_id: schedule.interview_meeting.id,
            session_name: schedule.interview_session.name,
            session_id: schedule.interview_session.id,
          },
        ]}
        closeDialog={() => {}}
        application_log_id={null}
      />
      {isCancelButtonVisible && (
        <UIButton
          variant='outline'
          size='sm'
          onClick={() => {
            setIsCancelDialogOpen(true);
          }}
        >
          Cancel Schedule
        </UIButton>
      )}
    </>
  );
}

export default ButtonGroup;
