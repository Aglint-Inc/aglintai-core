import axios from 'axios';

import { supabase } from '@/src/utils/supabase/client';

import { addScheduleActivity } from '../../../Candidates/queries/utils';
import { cancelMailHandler } from '../../mailUtils';
import { SchedulingApplication } from '../../store';

export const meetingActivityMailCalenderHandler = async ({
  selectedSession,
  application_id,
  rec_user_id,
}: {
  selectedSession: SchedulingApplication['selectedSession'];
  application_id: string;
  rec_user_id: string;
}) => {
  const { error: errMeet } = await supabase
    .from('interview_meeting')
    .update({
      status: 'cancelled',
    })
    .eq('id', selectedSession.meeting_id);

  if (errMeet) {
    throw new Error(errMeet.message);
  }

  await addScheduleActivity({
    title: `Cancelled session ${selectedSession.name}`,
    application_id: application_id,
    logged_by: 'user',
    supabase,
    created_by: rec_user_id,
  });

  if (selectedSession.interview_meeting.meeting_flow !== 'debrief') {
    cancelMailHandler({
      application_id: application_id,
      session_ids: [selectedSession.id],
    });
  }

  if (
    selectedSession.interview_meeting.status === 'confirmed' &&
    selectedSession.interview_meeting.meeting_json
  ) {
    axios.post('/api/scheduling/v1/cancel_calender_event', {
      calender_event: selectedSession.interview_meeting.meeting_json,
    });
  }
};
