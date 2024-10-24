import { type ApiCancelScheduledInterview } from '@aglint/shared-types';
import {
  createRequestProgressLogger,
  supabaseWrap,
} from '@aglint/shared-utils';
import { executeWorkflowAction } from '@aglint/shared-utils/src/request-workflow/utils';
import axios from 'axios';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

export const cancelInterviewScheduling = async (
  req_body: ApiCancelScheduledInterview,
) => {
  const { session_ids, request_id } = req_body;
  const supabaseAdmin = getSupabaseServer();

  const reqProgressLogger = createRequestProgressLogger({
    request_id: request_id,
    supabaseAdmin: supabaseAdmin,
    event_type: 'CANCEL_INTERVIEW_MEETINGS',
  });

  const action = async () => {
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

    const promises = meetings.map(async (meeting) => {
      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v1/cancel_calender_event`,
        { calender_event: meeting.meeting_json },
      );
    });
    await Promise.all(promises);
    supabaseWrap(
      await supabaseAdmin
        .from('request')
        .update({
          status: 'completed',
        })
        .eq('id', req_body.request_id),
    );
  };

  await executeWorkflowAction(action, {}, reqProgressLogger);
};
