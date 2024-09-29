import { z } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';
const schema = z.object({
  application_id: z.string(),
});
const query = async ({ input }: PrivateProcedure<typeof schema>) => {
  const { application_id } = input;
  const db = createPublicClient();

  return (
    await db
      .from('request')
      .select(
        '*,assignee_details:recruiter_user!request_assignee_id_fkey(first_name, last_name, profile_image),request_relation(*,interview_session(id,name,session_duration,session_type)),applications(id, job_id, recruiter_id, public_jobs(id,job_title,departments(name)))',
      )
      .eq('application_id', application_id)
      .throwOnError()
  ).data;
};

export const applicantRequest = privateProcedure.input(schema).query(query);
