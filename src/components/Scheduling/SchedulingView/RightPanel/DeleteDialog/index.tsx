/* eslint-disable no-unused-vars */
import { Dialog } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';

import { DeletePopup } from '@/devlink3';
import { supabase } from '@/src/utils/supabase/client';

import { useScheduleDetails } from '../..';

function DeleteScheduleDialog({
  isCancelOpen,
  setIsCancelOpen,
}: {
  isCancelOpen: boolean;
  setIsCancelOpen: (x: boolean) => void;
}) {
  const router = useRouter();
  const { refetch } = useScheduleDetails();
  const schedule_id = router.query.schedule_id;
  const onClickCancel = async () => {
    try {
      if (schedule_id) {
        const { data, error: errMeet } = await supabase
          .from('interview_meeting')
          .update({
            status: 'cancelled',
          })
          .eq('interview_schedule_id', schedule_id)
          .select();
        if (errMeet) {
          throw new Error(errMeet.message);
        }
        await supabase
          .from('interview_schedule')
          .update({ status: 'cancelled' })
          .eq('id', schedule_id);
        refetch();
        setIsCancelOpen(false);
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
        buttonText={'Cancel Schedule'}
      />
    </Dialog>
  );
}

export default DeleteScheduleDialog;
