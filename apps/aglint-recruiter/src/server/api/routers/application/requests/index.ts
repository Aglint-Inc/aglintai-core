import { z } from 'zod';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const applicationRequestSchema = z.object({
  application_id: z.string().uuid(),
});

const query = async (
  ctx: PrivateProcedure<typeof applicationRequestSchema>,
) => {
  return await getApplicationRequests(ctx);
};

export const applicationRequest = privateProcedure
  .input(applicationRequestSchema)
  .query(query);

export type ApplicationRequest = ProcedureDefinition<typeof applicationRequest>;

const getApplicationRequests = async (
  ctx: PrivateProcedure<typeof applicationRequestSchema>,
) => {
  const db = await createPrivateClient();
  const {
    input: { application_id },
  } = ctx;
  return (
    await db
      .from('request')
      .select(
        '*,assignee_details:recruiter_user!request_assignee_id_fkey(first_name, last_name, profile_image),request_relation(*,interview_session(id,name,session_duration,session_type)),applications(id, job_id, recruiter_id, public_jobs(id,job_title,departments(name)))',
      )
      .eq('application_id', application_id)
      .order('created_at', { ascending: false })
      .throwOnError()
  ).data;
};
