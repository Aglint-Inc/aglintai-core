import { Dialog } from '@mui/material';
import axios from 'axios';

import { DeletePopup } from '@/devlink3';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';

import { addScheduleActivity } from '../../../Candidates/queries/utils';
import {
  setIsCancelOpen,
  useInterviewSchedulingStore,
} from '../../../Candidates/store';
import { cancelMailHandler } from '../../../Candidates/utils';
import { useAllActivities } from '../../hooks';
import { setinitialSessions, useSchedulingApplicationStore } from '../../store';

function CancelScheduleDialog() {
  const { recruiterUser, recruiter } = useAuthDetails();
  const isCancelOpen = useInterviewSchedulingStore(
    (state) => state.isCancelOpen,
  );
  const selectedSession = useSchedulingApplicationStore(
    (state) => state.selectedSession,
  );
  const initialSessions = useSchedulingApplicationStore(
    (state) => state.initialSessions,
  );
  const selectedApplication = useSchedulingApplicationStore(
    (state) => state.selectedApplication,
  );
  const { refetch } = useAllActivities({
    application_id: selectedApplication?.id,
  });

  const onClickCancel = async () => {
    try {
      if (selectedSession.id) {
        const { data: checkFilterJson, error: errMeetFilterJson } =
          await supabase
            .from('interview_filter_json')
            .select('*')
            .contains('session_ids', [selectedSession.id]);

        cancelMailHandler({
          candidate_name: selectedApplication.candidates.first_name,
          mail: recruiterUser.email,
          job_title: selectedApplication.public_jobs.job_title,
          rec_id: recruiter.id,
          rec_mail: recruiterUser.email,
          session_name: selectedSession.name,
          supabase: supabase,
        });

        if (errMeetFilterJson) throw new Error(errMeetFilterJson.message);

        if (checkFilterJson.length > 0) {
          const updateDbArray = checkFilterJson.map((filterJson) => ({
            ...filterJson,
            session_ids: filterJson.session_ids.filter(
              (id) => id !== selectedSession.id,
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
          .eq('id', selectedSession.meeting_id)
          .select();
        if (errMeet) {
          throw new Error(errMeet.message);
        }

        await addScheduleActivity({
          title: `Cancelled session ${selectedSession.name}`,
          application_id: selectedApplication.id,
          logger: recruiterUser.user_id,
          type: 'schedule',
          supabase,
          created_by: recruiterUser.user_id,
        });

        setIsCancelOpen(false);

        setinitialSessions(
          initialSessions.map((session) => {
            if (session.id === selectedSession.id) {
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

        if (data[0].meeting_json) {
          axios.post('/api/scheduling/v1/cancel_calender_event', {
            calender_event: data[0].meeting_json,
          });
        }
      }
    } catch {
      //
    } finally {
      refetch();
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
        buttonText={'Confirm'}
      />
    </Dialog>
  );
}

export default CancelScheduleDialog;
