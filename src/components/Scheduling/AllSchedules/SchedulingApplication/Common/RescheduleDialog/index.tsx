import { Dialog } from '@mui/material';

import { ConfirmationPopup } from '@/devlink3';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { addScheduleActivity } from '../../../queries/utils';
import {
  setIsCancelOpen,
  setIsRescheduleOpen,
  useInterviewSchedulingStore,
} from '../../../store';
import { useAllActivities } from '../../hooks';
import {
  setinitialSessions,
  setSelectedSessionIds,
  useSchedulingApplicationStore,
} from '../../store';

function RescheduleDialog() {
  const { recruiterUser } = useAuthDetails();
  const isRescheduleOpen = useInterviewSchedulingStore(
    (state) => state.isRescheduleOpen,
  );
  const selectedSession = useSchedulingApplicationStore(
    (state) => state.selectedSession,
  );
  const initialSessions = useSchedulingApplicationStore(
    (state) => state.initialSessions,
  );
  const selectedApplication = useSchedulingApplicationStore(
    (state) => state.selectedApplication,
  );
  const { refetch } = useAllActivities({
    application_id: selectedApplication?.id,
  });

  const onClickReschedule = async () => {
    try {
      if (selectedSession.id) {
        const { data: checkFilterJson, error: errMeetFilterJson } =
          await supabase
            .from('interview_filter_json')
            .select('*')
            .contains('session_ids', [selectedSession.id]);

        if (errMeetFilterJson) throw new Error(errMeetFilterJson.message);

        if (checkFilterJson.length > 0) {
          const updateDbArray = checkFilterJson.map((filterJson) => ({
            ...filterJson,
            session_ids: filterJson.session_ids.filter(
              (id) => id !== selectedSession.id,
            ),
          }));

          const { error: errFilterJson } = await supabase
            .from('interview_filter_json')
            .upsert(updateDbArray);

          if (errFilterJson) throw new Error(errFilterJson.message);
        }

        const { error: errMeet } = await supabase
          .from('interview_meeting')
          .update({
            status: 'cancelled',
          })
          .eq('id', selectedSession.meeting_id);
        if (errMeet) {
          throw new Error(errMeet.message);
        }

        await addScheduleActivity({
          title: `Cancelled session ${selectedSession.name}`,
          application_id: selectedApplication.id,
          logger: recruiterUser.user_id,
          type: 'schedule',
          supabase,
          created_by: recruiterUser.user_id,
        });

        setinitialSessions(
          initialSessions.map((session) => {
            if (session.id === selectedSession.id) {
              return {
                ...session,
                interview_meeting: {
                  ...session.interview_meeting,
                  status: 'cancelled',
                },
              };
            } else {
              return session;
            }
          }),
        );
        setIsCancelOpen(false);
        setIsRescheduleOpen(false);
        setSelectedSessionIds([selectedSession.id]);
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      refetch();
    }
  };

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          background: 'transparent',
          border: 'none',
          borderRadius: '10px',
        },
      }}
      open={isRescheduleOpen}
      onClose={() => {
        setIsRescheduleOpen(false);
      }}
    >
      <ConfirmationPopup
        textPopupTitle={'Reschedule'}
        textPopupDescription={
          'Are you sure you want to reschedule? The old schedule will be canceled and a new schedule will be created. This action cannot be undone.'
        }
        isIcon={false}
        onClickCancel={{
          onClick: () => {
            setIsRescheduleOpen(false);
          },
        }}
        onClickAction={{
          onClick: onClickReschedule,
        }}
        textPopupButton={'Reschedule'}
      />
    </Dialog>
  );
}

export default RescheduleDialog;
