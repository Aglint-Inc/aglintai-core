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
  const meeting_id = router.query.meeting_id;
  const onClickCancel = async () => {
    try {
      if (meeting_id) {
        const { data, error: errMeet } = await supabase
          .from('interview_meeting')
          .update({
            status: 'cancelled',
          })
          .eq('id', meeting_id)
          .select();
        if (errMeet) {
          throw new Error(errMeet.message);
        }
        refetch();
        setIsCancelOpen(false);
        if (data[0].meeting_json)
          axios.post('/api/scheduling/v2/cancel_calender_event', {
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
        buttonText={'Cancel Schedule'}
      />
    </Dialog>
  );
}

export default DeleteScheduleDialog;
