import { type ApiCancelScheduledInterview } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import axios from 'axios';

import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

const cancelInterviewScheduling = async (
  req_body: ApiCancelScheduledInterview,
) => {
  const { session_ids } = req_body;
  const supabaseAdmin = getSupabaseServer();

  const meeting_ids = supabaseWrap(
    await supabaseAdmin
      .from('interview_session')
      .select('meeting_id')
      .in('id', session_ids),
  );
  const meetings = supabaseWrap(
    await supabaseAdmin
      .from('interview_meeting')
      .update({
        status: 'cancelled',
      })
      .in(
        'id',
        meeting_ids.map((i) => i.meeting_id),
      )
      .select(),
  );

  if (meetings.length === 0) return 'no meetings found';
  const promises = meetings.map(async (meeting) => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v1/cancel_calender_event`,
      { calender_event: meeting.meeting_json },
    );
  });
  await Promise.all(promises);
};

export default createPageApiPostRoute(null, cancelInterviewScheduling);
