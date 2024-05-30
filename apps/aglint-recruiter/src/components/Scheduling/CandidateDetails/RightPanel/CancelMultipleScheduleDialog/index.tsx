import { DatabaseTableInsert } from '@aglint/shared-types';
import { Dialog } from '@mui/material';
import axios from 'axios';

import { DeletePopup } from '@/devlink3/DeletePopup';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';

import { addScheduleActivity } from '../../../Candidates/queries/utils';
import { cancelMailHandler } from '../../../Candidates/utils';
import {
  setinitialSessions,
  setMultipleCancelOpen,
  useSchedulingApplicationStore,
} from '../../store';

function CancelMultipleScheduleDialog({ refetch }: { refetch: () => void }) {
  const { recruiterUser, recruiter } = useAuthDetails();
  const isCancelOpen = useSchedulingApplicationStore(
    (state) => state.isMultipleCancelOpen,
  );
  const selectedFilterId = useSchedulingApplicationStore(
    (state) => state.selectedFilterId,
  );
  const initialSessions = useSchedulingApplicationStore(
    (state) => state.initialSessions,
  );
  const selectedApplication = useSchedulingApplicationStore(
    (state) => state.selectedApplication,
  );

  const onClickCancel = async () => {
    try {
      if (selectedFilterId) {
        const { data: checkFilterJson, error: errMeetFilterJson } =
          await supabase
            .from('interview_filter_json')
            .select('*')
            .eq('id', selectedFilterId);

        const selectedSessions = initialSessions.filter((ses) =>
          checkFilterJson[0].session_ids.includes(ses.id),
        );

        const sessionsName = selectedSessions
          .map((ses) => ses.name)
          .join(' , ');

        cancelMailHandler({
          candidate_name: selectedApplication.candidates.first_name,
          mail: recruiterUser.email,
          job_title: selectedApplication.public_jobs.job_title,
          rec_id: recruiter.id,
          rec_mail: recruiterUser.email,
          session_name: sessionsName,
          supabase: supabase,
        });

        if (errMeetFilterJson) throw new Error(errMeetFilterJson.message);

        if (checkFilterJson.length > 0) {
          const { error: errFilterJson } = await supabase
            .from('interview_filter_json')
            .delete()
            .eq('id', selectedFilterId);

          if (errFilterJson) throw new Error(errFilterJson.message);
        }

        const selectedMeetings: DatabaseTableInsert['interview_meeting'][] =
          selectedSessions.map((ses) => ({
            id: ses.interview_meeting.id,
            status: 'cancelled',
            interview_schedule_id: ses.interview_meeting.interview_schedule_id,
          }));

        const { error: errMeet } = await supabase
          .from('interview_meeting')
          .upsert(selectedMeetings)
          .select();
        if (errMeet) {
          throw new Error(errMeet.message);
        }

        await addScheduleActivity({
          title: `Cancelled session ${sessionsName}`,
          application_id: selectedApplication.id,
          logged_by: 'user',
          type: 'schedule',
          supabase,
          created_by: recruiterUser.user_id,
        });

        setMultipleCancelOpen(false);

        setinitialSessions(
          initialSessions.map((session) => {
            if (selectedSessions.some((ses) => ses.id === session.id)) {
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

        selectedSessions.forEach((ses) => {
          axios.post('/api/scheduling/v1/cancel_calender_event', {
            calender_event: ses.interview_meeting.meeting_json,
          });
        });
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
        setMultipleCancelOpen(false);
      }}
    >
      <DeletePopup
        textTitle={'Cancel Schedule'}
        textDescription={
          'Are you sure you want to cancel this schedules? This action cannot be undone. Please note, canceling will automatically send an email notification to the candidate.'
        }
        isIcon={false}
        onClickCancel={{
          onClick: () => {
            setMultipleCancelOpen(false);
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

export default CancelMultipleScheduleDialog;
