import { Dialog } from '@mui/material';
import axios from 'axios';

import { DeletePopup } from '@/devlink3';
import { supabase } from '@/src/utils/supabase/client';

import { setIsCancelOpen, useInterviewSchedulingStore } from '../../../store';
import { setinitialSessions, useSchedulingApplicationStore } from '../../store';

function CancelScheduleDialog() {
  const isCancelOpen = useInterviewSchedulingStore(
    (state) => state.isCancelOpen,
  );
  const selectedMeeting = useSchedulingApplicationStore(
    (state) => state.selectedMeeting,
  );
  const initialSessions = useSchedulingApplicationStore(
    (state) => state.initialSessions,
  );

  const onClickCancel = async () => {
    try {
      if (selectedMeeting.id) {
        const { data: checkFilterJson, error: errMeetFilterJson } =
          await supabase
            .from('interview_filter_json')
            .select('*')
            .contains('session_ids', [selectedMeeting.session_id]);

        if (errMeetFilterJson) throw new Error(errMeetFilterJson.message);

        if (checkFilterJson.length > 0) {
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
        }

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
        setIsCancelOpen(false);

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

        if (data[0].meeting_json)
          axios.post('/api/scheduling/v1/cancel_calender_event', {
            calender_event: data[0].meeting_json,
          });
      }
    } catch {
      //
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
      open={isCancelOpen}
      onClose={() => {
        setIsCancelOpen(false);
      }}
    >
      <DeletePopup
        textTitle={'Cancel Schedule'}
        textDescription={
          'Are you sure you want to delete this schedule? This action cannot be undone.'
        }
        isIcon={false}
        onClickCancel={{
          onClick: () => {
            setIsCancelOpen(false);
          },
        }}
        onClickDelete={{
          onClick: () => {
            onClickCancel();
          },
        }}
        buttonText={'Confirm'}
      />
    </Dialog>
  );
}

export default CancelScheduleDialog;
