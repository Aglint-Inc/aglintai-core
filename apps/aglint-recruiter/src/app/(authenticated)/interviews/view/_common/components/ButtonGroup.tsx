import { useTenant } from '@/company/hooks';
import { UIButton } from '@/components/Common/UIButton';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';

import { useScheduleDetails } from '../hooks/useScheduleDetails';
import { setIsCancelDialogOpen, useScheduleDetailsStore } from '../stores';
import CancelScheduleDialog from './CancelScheduleDialog';

function ButtonGroup() {
  const { recruiter_user } = useTenant();
  const userId = recruiter_user?.user_id ?? '';
  const { checkPermissions } = useRolesAndPermissions();
  const { isCancelDialogOpen } = useScheduleDetailsStore();
  const { data, refetch } = useScheduleDetails();
  const schedule = data?.schedule_data;

  const isMeetingJobHiringTeam =
    schedule?.hiring_manager?.user_id === userId ||
    schedule?.organizer?.user_id === userId ||
    schedule?.recruiter?.user_id === userId;

  const isCancelButtonVisible =
    ((checkPermissions && checkPermissions(['scheduling_actions'])) ||
      isMeetingJobHiringTeam) &&
    schedule?.interview_meeting?.status === 'confirmed';

  return (
    <>
      <CancelScheduleDialog
        isDeclineOpen={isCancelDialogOpen}
        setIsDeclineOpen={setIsCancelDialogOpen}
        refetch={refetch}
        metaDetails={[
          {
            application_id: schedule?.application_id ?? '',
            meeting_id: schedule?.interview_meeting.id ?? '',
            session_name: schedule?.interview_session.name ?? '',
            session_id: schedule?.interview_session.id ?? '',
          },
        ]}
        closeDialog={() => {}}
        application_log_id={null}
      />
      {isCancelButtonVisible && (
        <UIButton
          variant='outline'
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
