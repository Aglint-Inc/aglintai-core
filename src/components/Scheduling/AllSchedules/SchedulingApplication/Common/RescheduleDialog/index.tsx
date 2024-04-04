import { Dialog } from '@mui/material';
import axios from 'axios';

import { ConfirmationPopup } from '@/devlink3';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import {
  setIsCancelOpen,
  setIsRescheduleOpen,
  useInterviewSchedulingStore,
} from '../../../store';
import {
  setinitialSessions,
  setIsScheduleNowOpen,
  setSelectedSessionIds,
  useSchedulingApplicationStore,
} from '../../store';

function RescheduleDialog() {
  const isRescheduleOpen = useInterviewSchedulingStore(
    (state) => state.isRescheduleOpen,
  );
  const selectedMeeting = useSchedulingApplicationStore(
    (state) => state.selectedMeeting,
  );
  const initialSessions = useSchedulingApplicationStore(
    (state) => state.initialSessions,
  );

  const onClickReschedule = async () => {
    try {
      if (selectedMeeting.id) {
        const { data: checkFilterJson, error: errMeetFilterJson } =
          await supabase
            .from('interview_filter_json')
            .select('*')
            .contains('session_ids', [selectedMeeting.session_id]);

        if (errMeetFilterJson) throw new Error(errMeetFilterJson.message);

        if (!checkFilterJson.length) {
          throw new Error('No filter json found');
        }

        const updateDbArray = checkFilterJson.map((filterJson) => ({
          ...filterJson,
          session_ids: filterJson.session_ids.filter(
            (id) => id !== selectedMeeting.session_id,
          ),
        }));

        const { error: errFilterJson } = await supabase
          .from('interview_filter_json')
          .upsert(updateDbArray);

        if (errFilterJson) throw new Error(errFilterJson.message);

        const { data, error: errMeet } = await supabase
          .from('interview_meeting')
          .update({
            status: 'cancelled',
          })
          .eq('id', selectedMeeting.id)
          .select();
        if (errMeet) {
          throw new Error(errMeet.message);
        }

        setinitialSessions(
          initialSessions.map((session) => {
            if (session.interview_meeting.id === selectedMeeting.id) {
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
        setSelectedSessionIds([selectedMeeting.session_id]);
        setIsScheduleNowOpen(true);

        if (data[0]?.meeting_json)
          axios.post('/api/scheduling/v1/cancel_calender_event', {
            calender_event: data[0]?.meeting_json,
          });
      }
    } catch (e) {
      toast.error(e.message);
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
        textPopupTitle={'Confirm Reschedule'}
        textPopupDescription={
          'Old schedule will be canceled and new schedule will be created. Are you sure you want to reschedule?'
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
        textPopupButton={'Confirm'}
      />
    </Dialog>
  );
}

export default RescheduleDialog;
