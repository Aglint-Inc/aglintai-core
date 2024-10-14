import { type ApiCancelScheduledInterview } from '@aglint/shared-types';
import { candidate_new_schedule_schema } from '@aglint/shared-utils';
import axios from 'axios';
import { z } from 'zod';

const schema = z.object({
  session_ids: z.array(z.string()),
  target_api: z.string(),
  request_id: z.string(),
  event_run_id: z.number().optional(),
});
export const onCandidateScheduleCancel = async (
  parsed_body: z.infer<typeof schema>,
) => {
  const { session_ids, target_api } =
    candidate_new_schedule_schema.parse(parsed_body);

  if (target_api === 'onRequestCancel_agent_cancelEvents') {
    await cancelInterviews({ session_ids, request_id: parsed_body.request_id });
  }
};

const cancelInterviews = async ({
  session_ids,
  request_id,
}: ApiCancelScheduledInterview) => {
  await axios.post(
    `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v1/cancel_interview_scheduling`,
    {
      session_ids,
      request_id,
    },
  );
};
