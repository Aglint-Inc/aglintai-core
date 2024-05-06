/* eslint-disable no-unused-vars */
import { Dialog } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';

import { DeletePopup } from '@/devlink3';
import { supabase } from '@/src/utils/supabase/client';

import { TransformSchedule } from '../../../Modules/types';
import { useScheduleDetails } from '../../hooks';

function DeleteScheduleDialog({
  isCancelOpen,
  setIsCancelOpen,
  schedule,
}: {
  isCancelOpen: boolean;
  setIsCancelOpen: (x: boolean) => void;
  schedule: TransformSchedule;
}) {
  const router = useRouter();
  const meeting_id = schedule.interview_meeting.id;
  const queryClient = useQueryClient();
  const refetch = () => {
    queryClient.invalidateQueries({
      queryKey: ['schedule_details', meeting_id],
    });
  };

  const onClickCancel = async () => {
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
          'Are you sure you want to cancel this schedule? This action cannot be undone. Please note, canceling will automatically send an email notification to the candidate.'
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
