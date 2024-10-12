import {
  candidate_new_schedule_schema,
  createRequestProgressLogger,
  executeWorkflowAction,
  type ProgressLoggerType,
} from '@aglint/shared-utils';
import axios from 'axios';
import { type z } from 'zod';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

export const onCandidateScheduleCancel = async (
  parsed_body: z.infer<typeof candidate_new_schedule_schema>,
) => {
  const supabaseAdmin = getSupabaseServer();

  const reqProgressLogger: ProgressLoggerType = createRequestProgressLogger({
    request_id: parsed_body.request_id,
    event_run_id: parsed_body.event_run_id,
    supabaseAdmin: supabaseAdmin,
    event_type: 'CANCEL_INTERVIEW_MEETINGS',
  });
  await reqProgressLogger.resetEventProgress();

  const { session_ids, target_api } =
    candidate_new_schedule_schema.parse(parsed_body);

  if (target_api === 'onRequestCancel_agent_cancelEvents') {
    await executeWorkflowAction(
      cancelInterviews,
      { session_ids },
      reqProgressLogger,
    );
  }
};

const cancelInterviews = async ({ session_ids }: { session_ids: string[] }) => {
  await axios.post(
    `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v1/cancel_interview_scheduling`,
    {
      session_ids,
    },
  );
};
