import { Dialog } from '@mui/material';

import { DeletePopup } from '@/devlink3/DeletePopup';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { useGetScheduleApplication } from '../../hooks';
import {
  setIndividualCancelOpen,
  setSelectedSessionIds,
  useSchedulingApplicationStore,
} from '../../store';
import { meetingActivityMailCalenderHandler } from './utils';

function CancelScheduleDialog({ refetch }: { refetch: () => void }) {
  const { recruiterUser } = useAuthDetails();
  const { availabilities, isCancelOpen, selectedApplication, selectedSession } =
    useSchedulingApplicationStore((state) => ({
      availabilities: state.availabilities,
      isCancelOpen: state.isIndividualCancelOpen,
      selectedSession: state.selectedSession,
      selectedApplication: state.selectedApplication,
    }));

  const { fetchInterviewDataByApplication } = useGetScheduleApplication();

  const onClickCancel = async () => {
    try {
      if (selectedSession.id) {
        if (
          selectedSession.interview_meeting.meeting_flow ===
            'self_scheduling' ||
          selectedSession.interview_meeting.meeting_flow === 'debrief'
        ) {
          await cancelSelfScheduledSession();
        } else if (
          selectedSession.interview_meeting.meeting_flow === 'candidate_request'
        ) {
          await cancelRequestAvailibilitySession();
        }

        meetingActivityMailCalenderHandler({
          selectedSession,
          application_id: selectedApplication.id,
          rec_user_id: recruiterUser.user_id,
        });
      }
    } catch {
      toast.error('Error cancelling schedule');
    } finally {
      setIndividualCancelOpen(false);
      fetchInterviewDataByApplication();
      setSelectedSessionIds([]);
      refetch();
    }
  };

  const cancelSelfScheduledSession = async () => {
    const { data: checkFilterJson, error: errMeetFilterJson } = await supabase
      .from('interview_filter_json')
      .select('*')
      .contains('session_ids', [selectedSession.id]);

    if (errMeetFilterJson) throw new Error(errMeetFilterJson.message);

    if (checkFilterJson.length > 0) {
      const updateDbArray = checkFilterJson.map((filterJson) => ({
        ...filterJson,
        session_ids: filterJson.session_ids.filter(
          (id) => id !== selectedSession.id,
        ),
        selected_options: filterJson.selected_options.map((option) => ({
          ...option,
          sessions: option.sessions.filter(
            (ses) => ses.session_id !== selectedSession.id,
          ),
        })),
      }));

      const { error: errFilterJson } = await supabase
        .from('interview_filter_json')
        .upsert(updateDbArray);

      if (errFilterJson) throw new Error(errFilterJson.message);
    }
  };

  const cancelRequestAvailibilitySession = async () => {
    const sessionAvailibility = availabilities.find((ava) =>
      ava.session_ids.some((ses) => ses.id === selectedSession.id),
    );

    if (!sessionAvailibility) throw new Error('Session not found');

    const { error: errReqAva } = await supabase
      .from('candidate_request_availability')
      .update({
        session_ids: sessionAvailibility.session_ids.filter(
          (ses) => ses.id !== selectedSession.id,
        ),
      })
      .eq('id', sessionAvailibility.id);

    if (errReqAva) throw new Error(errReqAva.message);
  };

  return (
    <Dialog
      open={isCancelOpen}
      onClose={() => {
        setIndividualCancelOpen(false);
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
            setIndividualCancelOpen(false);
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
