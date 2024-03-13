import { Dialog } from '@mui/material';
import React from 'react';

import { ConfirmationPopup } from '@/devlink3';
import { supabase } from '@/src/utils/supabase/client';

import {
  setSelectedApplication,
  useSchedulingApplicationStore
} from '../store';
import {
  setApplicationList,
  setIsCancelOpen,
  setIsRescheduleOpen,
  useInterviewSchedulingStore
} from '../../store';

function RescheduleDialog() {
  const isRescheduleOpen = useInterviewSchedulingStore(
    (state) => state.isRescheduleOpen
  );
  const applicationList = useInterviewSchedulingStore(
    (state) => state.applicationList
  );

  const selectedApplication = useSchedulingApplicationStore(
    (state) => state.selectedApplication
  );

  const onClickReschedule = async () => {
    try {
      if (selectedApplication.schedule.id) {
        await supabase
          .from('interview_meeting')
          .delete()
          .eq('interview_schedule_id', selectedApplication.schedule.id);

        await supabase
          .from('interview_schedule')
          .update({
            status: 'reschedule'
          })
          .eq('id', selectedApplication.schedule.id);
        setIsCancelOpen(false);
        setSelectedApplication({
          ...selectedApplication,
          schedule: { ...selectedApplication.schedule, status: 'reschedule' }
        });
        applicationList.filter(
          (app) => app.applications.id === selectedApplication.applications.id
        )[0].schedule.status = 'reschedule';
        setApplicationList([...applicationList]);
        setIsRescheduleOpen(false);
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
          }
        }}
        onClickAction={{
          onClick: onClickReschedule
        }}
        textPopupButton={'Confirm'}
      />
    </Dialog>
  );
}

export default RescheduleDialog;
