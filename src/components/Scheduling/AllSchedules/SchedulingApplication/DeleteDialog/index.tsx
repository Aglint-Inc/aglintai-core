import { Dialog } from '@mui/material';

import { DeletePopup } from '@/devlink3';
import { supabase } from '@/src/utils/supabase/client';

import {
  setSelectedApplication,
  useSchedulingApplicationStore
} from '../store';
import {
  setApplicationList,
  setIsCancelOpen,
  useInterviewSchedulingStore
} from '../../store';

function DeleteScheduleDialog() {
  const isCancelOpen = useInterviewSchedulingStore(
    (state) => state.isCancelOpen
  );
  const applicationList = useInterviewSchedulingStore(
    (state) => state.applicationList
  );
  const selectedApplication = useSchedulingApplicationStore(
    (state) => state.selectedApplication
  );

  const onClickCancel = async () => {
    try {
      if (selectedApplication.schedule.id) {
        await supabase
          .from('interview_meeting')
          .delete()
          .eq('interview_schedule_id', selectedApplication.schedule.id);

        await supabase
          .from('interview_schedule')
          .update({ status: 'cancelled' })
          .eq('id', selectedApplication.schedule.id);
        setIsCancelOpen(false);
        setSelectedApplication({
          ...selectedApplication,
          schedule: { ...selectedApplication.schedule, status: 'cancelled' }
        });
        applicationList.filter(
          (app) => app.applications.id === selectedApplication.applications.id
        )[0].schedule.status = 'cancelled';
        setApplicationList([...applicationList]);
        // if ((selectedApplication.schedule.meeting_json as any)?.id) {
        //   const res = await axios.post(
        //     '/api/scheduling/update-calender-event-status',
        //     {
        //       organizer_id: selectedApplication.schedule.created_by,
        //       event_id: (selectedApplication.schedule.meeting_json as any).id
        //     }
        //   );
        //   if (res.status !== 200) {
        //     throw new Error('Error in response');
        //   }
        // }
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
