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

        const allMeeting = data;
        allMeeting.forEach(async (meet) => {
          if (meet.meeting_json)
            axios.post('/api/scheduling/v2/cancel_calender_event', {
              calender_event: meet.meeting_json,
            });
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
