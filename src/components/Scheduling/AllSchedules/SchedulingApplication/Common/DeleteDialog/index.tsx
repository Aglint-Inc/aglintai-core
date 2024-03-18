import { Dialog } from '@mui/material';
import axios from 'axios';

import { DeletePopup } from '@/devlink3';
import { supabase } from '@/src/utils/supabase/client';

import {
  setSelectedApplication,
  useSchedulingApplicationStore
} from '../../store';
import { setIsCancelOpen, useInterviewSchedulingStore } from '../../../store';

function DeleteScheduleDialog() {
  const isCancelOpen = useInterviewSchedulingStore(
    (state) => state.isCancelOpen
  );
  const selectedApplication = useSchedulingApplicationStore(
    (state) => state.selectedApplication
  );

  const onClickCancel = async () => {
    try {
      if (selectedApplication.schedule.id) {
        const { data, error: errMeet } = await supabase
          .from('interview_meeting')
          .update({
            status: 'cancelled'
          })
          .eq('interview_schedule_id', selectedApplication.schedule.id)
          .select();
        if (errMeet) {
          throw new Error(errMeet.message);
        }
        await supabase
          .from('interview_schedule')
          .update({ status: 'cancelled' })
          .eq('id', selectedApplication.schedule.id);
        setIsCancelOpen(false);
        setSelectedApplication({
          ...selectedApplication,
          schedule: { ...selectedApplication.schedule, status: 'cancelled' }
        });

        const allMeeting = data;
        allMeeting.forEach(async (meet) => {
          if (meet.meeting_json)
            axios.post('/api/scheduling/v2/cancel_calender_event', {
              calender_event: meet.meeting_json
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
          borderRadius: '10px'
        }
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
          }
        }}
        onClickDelete={{
          onClick: () => {
            onClickCancel();
          }
        }}
        buttonText={'Cancel Schedule'}
      />
    </Dialog>
  );
}

export default DeleteScheduleDialog;
