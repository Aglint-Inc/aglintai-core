import {
  createRequestProgressLogger,
  schema_update_meeting_ints,
} from '@aglint/shared-utils';
import { executeWorkflowAction } from '@aglint/shared-utils/src/request-workflow/utils';
import { supabaseWrap } from '@aglint/shared-utils/src/supabaseWrap';
import { type z } from 'zod';

import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { replaceInterviewerInSession } from '@/services/CandidateSchedule/utils/replaceInterviewer';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

const updateMeetingInterviewers = async (
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
    parsed_body,
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

export default createPageApiPostRoute(
  schema_update_meeting_ints,
  updateMeetingInterviewers,
);
