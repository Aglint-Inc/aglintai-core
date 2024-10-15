import {
  createRequestProgressLogger,
  executeWorkflowAction,
  type schema_update_meeting_ints,
  supabaseWrap,
} from '@aglint/shared-utils';
import { type z } from 'zod';

import { replaceInterviewerInSession } from '@/services/CandidateSchedule/utils/replaceInterviewer/replaceInterviewerInSession';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

export const updateMeetingInterviewers = async (
  parsed_body: z.infer<typeof schema_update_meeting_ints>,
) => {
  const supabaseAdmin = getSupabaseServer();
  const reqProgressLogger = createRequestProgressLogger({
    request_id: parsed_body.request_id,
    supabaseAdmin,
    event_type: 'REPLACE_ALTERNATIVE_INTERVIEWER',
  });
  await executeWorkflowAction(
    replaceInterviewerInSession,
    {
      ...parsed_body,
      reqProgLogger: reqProgressLogger,
    },
    reqProgressLogger,
  );

  supabaseWrap(
    await supabaseAdmin
      .from('request')
      .update({
        status: 'completed',
      })
      .eq('id', parsed_body.request_id),
  );

  return 'ok';
};
