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
  setIsScheduleNowOpen,
  setSelectedSessionIds,
  useSchedulingApplicationStore
} from '../../store';

function RescheduleDialog() {
  const isRescheduleOpen = useInterviewSchedulingStore(
    (state) => state.isRescheduleOpen,
  );
  const selectedMeeting = useSchedulingApplicationStore(
    (state) => state.selectedMeeting,
  );

  const onClickReschedule = async () => {
    try {
      if (selectedMeeting.id) {
        const { data, error } = await supabase
          .from('interview_meeting')
          .select()
          .eq('id', selectedMeeting.id);

        if (error) {
          throw new Error(error.message);
        }
        setIsCancelOpen(false);
        setIsRescheduleOpen(false);
        setSelectedSessionIds([selectedMeeting.session_id]);
        setIsScheduleNowOpen(true);

        const allMeeting = data;
        allMeeting.forEach(async (meet) => {
          if (meet.meeting_json)
            axios.post('/api/scheduling/v2/cancel_calender_event', {
              calender_event: meet.meeting_json,
            });
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
          'Old schedule will be deleted and new schedule will be created. Are you sure you want to reschedule?'
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
