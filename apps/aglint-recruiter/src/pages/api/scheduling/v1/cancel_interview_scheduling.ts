import { type ApiCancelScheduledInterview } from '@aglint/shared-types';
import axios from 'axios';

import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

const cancelInterviewScheduling = async (
  req_body: ApiCancelScheduledInterview,
) => {
  const { session_ids } = req_body;
  const supabaseAdmin = getSupabaseServer();

  const meeting_ids = (
    await supabaseAdmin
      .from('interview_session')
      .select('meeting_id')
      .in('id', session_ids)
      .throwOnError()
  ).data;
  if (!meeting_ids) {
    throw new Error('No meeting ids found');
  }
  const meetings = (
    await supabaseAdmin
      .from('interview_meeting')
      .update({
        status: 'cancelled',
      })
      .in(
        'id',
        meeting_ids.map((i) => i.meeting_id),
      )
      .select()
      .throwOnError()
  ).data;

  if (!meetings || meetings.length === 0) {
    throw new Error('No meetings found');
  }

  const promises = meetings.map(async (meeting) => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v1/cancel_calender_event`,
      { calender_event: meeting.meeting_json },
    );
  });
  await Promise.all(promises);
};

export default createPageApiPostRoute(null, cancelInterviewScheduling);
