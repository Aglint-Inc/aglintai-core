import { DatabaseTableInsert } from '@aglint/shared-types';
import { Dialog } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';

import { DeletePopup } from '@/devlink3/DeletePopup';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { addScheduleActivity } from '../../../Candidates/queries/utils';
import { cancelMailHandler } from '../../../Candidates/utils';
import { useGetScheduleApplication } from '../../hooks';
import {
  setMultipleCancelOpen,
  setSelectedApplicationLog,
  useSchedulingApplicationStore,
} from '../../store';

function CancelMultipleScheduleDialog({ refetch }: { refetch: () => void }) {
  const { recruiterUser, recruiter } = useAuthDetails();
  const isCancelOpen = useSchedulingApplicationStore(
    (state) => state.isMultipleCancelOpen,
  );
  const selectedApplicationLog = useSchedulingApplicationStore(
    (state) => state.selectedApplicationLog,
  );
  const initialSessions = useSchedulingApplicationStore(
    (state) => state.initialSessions,
  );
  const selectedApplication = useSchedulingApplicationStore(
    (state) => state.selectedApplication,
  );

  const { fetchInterviewDataByApplication } = useGetScheduleApplication();

  useEffect(() => {
    return () => {
      onClickClose();
    };
  }, []);

  const onClickCancel = async () => {
    try {
      if (selectedApplicationLog.metadata?.type === 'booking_confirmation') {
        if (selectedApplicationLog.metadata?.filter_id) {
          await cancelSelfScheduledSessions(
            selectedApplicationLog.metadata?.filter_id,
          );
        } else if (selectedApplicationLog.metadata?.availability_request_id) {
          await cancelRequestAvailibilitySession(
            selectedApplicationLog.metadata?.availability_request_id,
          );
        }
      }
      if (
        selectedApplicationLog.metadata?.type ===
          'candidate_response_self_schedule' &&
        selectedApplicationLog.metadata?.filter_id
      ) {
        await cancelSelfScheduledSessions(
          selectedApplicationLog.metadata?.filter_id,
        );
      }
    } catch {
      toast.error('Error cancelling schedule');
    } finally {
      refetch();
      fetchInterviewDataByApplication();
      onClickClose();
    }
  };

  const cancelRequestAvailibilitySession = async (req_id: string) => {
    const {
      data: [reqAva],
      error: errReqAva,
    } = await supabase
      .from('candidate_request_availability')
      .select('*')
      .eq('id', req_id);

    if (errReqAva) throw new Error(errReqAva.message);

    const selectedSessions = reqAva.session_ids.map((reqses) => {
      const session = initialSessions.find((ses) => ses.id === reqses.id);
      return session;
    });

    const sessionsName = selectedSessions.map((ses) => ses.name).join(' , ');

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

    mailActivityCalenderHandler({
      selectedSessions,
      sessionsName,
    });
  };

  const cancelSelfScheduledSessions = async (filter_id: string) => {
    const { data: checkFilterJson, error: errMeetFilterJson } = await supabase
      .from('interview_filter_json')
      .select('*')
      .eq('id', filter_id);

    const selectedSessions = initialSessions.filter((ses) =>
      checkFilterJson[0].session_ids.includes(ses.id),
    );

    const sessionsName = selectedSessions.map((ses) => ses.name).join(' , ');

    if (errMeetFilterJson) throw new Error(errMeetFilterJson.message);

    if (checkFilterJson.length > 0) {
      const { error: errFilterJson } = await supabase
        .from('interview_filter_json')
        .delete()
        .eq('id', filter_id);

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

    mailActivityCalenderHandler({
      selectedSessions,
      sessionsName,
    });
  };

  const mailActivityCalenderHandler = async ({
    selectedSessions,
    sessionsName,
  }: {
    selectedSessions: typeof initialSessions;
    sessionsName: string;
  }) => {
    cancelMailHandler({
      candidate_name: selectedApplication.candidates.first_name,
      mail: recruiterUser.email,
      job_title: selectedApplication.public_jobs.job_title,
      rec_id: recruiter.id,
      session_name: sessionsName,
      supabase: supabase,
    });

    await addScheduleActivity({
      title: `Cancelled session ${sessionsName}`,
      application_id: selectedApplication.id,
      logged_by: 'user',
      supabase,
      created_by: recruiterUser.user_id,
    });

    selectedSessions.forEach((ses) => {
      axios.post('/api/scheduling/v1/cancel_calender_event', {
        calender_event: ses.interview_meeting.meeting_json,
      });
    });

    await supabase
      .from('application_logs')
      .update({
        metadata: {
          ...selectedApplicationLog.metadata,
          action: 'canceled',
        },
      })
      .eq('id', selectedApplicationLog.id);
  };

  const onClickClose = () => {
    setSelectedApplicationLog(null);
    setMultipleCancelOpen(false);
  };

  return (
    <Dialog
      open={isCancelOpen}
      onClose={() => {
        onClickClose();
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
            onClickClose();
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
