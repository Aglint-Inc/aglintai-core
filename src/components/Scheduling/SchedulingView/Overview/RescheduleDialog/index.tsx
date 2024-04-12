/* eslint-disable no-unused-vars */
import { Dialog } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';

import { ConfirmationPopup } from '@/devlink3';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { TransformSchedule } from '../../../Modules/types';

function RescheduleDialog({
  isRescheduleOpen,
  setIsRescheduleOpen,
  schedule,
}: {
  isRescheduleOpen: boolean;
  setIsRescheduleOpen: (x: boolean) => void;
  schedule: TransformSchedule;
}) {
  const router = useRouter();
  const meeting_id = schedule.interview_meeting.id;

  const onClickReschedule = async () => {
    try {
      if (meeting_id) {
        const { data: checkFilterJson, error: errMeetFilterJson } =
          await supabase
            .from('interview_filter_json')
            .select('*')
            .contains('session_ids', [meeting_id]);

        if (errMeetFilterJson) throw new Error(errMeetFilterJson.message);

        if (checkFilterJson.length > 0) {
          const updateDbArray = checkFilterJson.map((filterJson) => ({
            ...filterJson,
            session_ids: filterJson.session_ids.filter(
              (id) => id !== schedule.interview_session.id,
            ),
          }));

          const { error: errFilterJson } = await supabase
            .from('interview_filter_json')
            .upsert(updateDbArray);

          if (errFilterJson) throw new Error(errFilterJson.message);
        }

        const { data, error } = await supabase
          .from('interview_meeting')
          .update({ status: 'cancelled' })
          .eq('id', meeting_id)
          .select();
        if (error) {
          throw new Error(error.message);
        }
        setIsRescheduleOpen(false);
        if (data[0].meeting_json)
          axios.post('/api/scheduling/v2/cancel_calender_event', {
            calender_event: data[0].meeting_json,
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
