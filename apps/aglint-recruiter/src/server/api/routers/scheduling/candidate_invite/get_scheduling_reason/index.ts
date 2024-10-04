import { z } from 'zod';

import { type PublicProcedure, publicProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

const schema = z.object({
  recruiter_id: z.string(),
  application_id: z.string(),
  session_ids: z.array(z.string()),
});

const query = async ({
  input: { recruiter_id, application_id, session_ids },
}: PublicProcedure<typeof schema>) => {
  const scheduling_reason = await getSchedulingReason(recruiter_id);
  const cancel_data = await getCancelRescheduleData({
    session_ids,
    application_id,
  });
  return {
    scheduling_reason,
    cancel_data,
  };
};

export const getSchedulingReasonsCandidateInvite = publicProcedure
  .input(schema)
  .query(query);

const getSchedulingReason = async (id: string) => {
  const db = createPublicClient();
  const res = (
    await db
      .from('recruiter')
      .select('scheduling_reason')
      .eq('id', id)
      .single()
      .throwOnError()
  ).data!;
  return res.scheduling_reason;
};

const getCancelRescheduleData = async ({
  session_ids,
  application_id,
}: {
  session_ids: string[];
  application_id: string;
}) => {
  const db = createPublicClient();
  return db
    .from('interview_session_cancel')
    .select('reason, session_id, type, other_details ,created_at')
    .eq('is_resolved', false)
    .eq('is_ignored', false)
    .in('session_id', session_ids)
    .eq('application_id', application_id)
    .then(({ data, error }) => {
      if (error) {
        return [];
      }
      return data;
    });
};
