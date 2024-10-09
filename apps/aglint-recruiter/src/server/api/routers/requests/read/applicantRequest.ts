import { z } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

const schema = z.object({
  request_id: z.string(),
});

const query = async ({ input }: PrivateProcedure<typeof schema>) => {
  const { request_id } = input;
  const db = createPublicClient();

  const { data } = await db
    .from('request')
    .select(
      'applications(request(*,assignee_details:recruiter_user!request_assignee_id_fkey(first_name, last_name, profile_image),request_relation(*,interview_session(id,name,session_duration,session_type)),applications(id, job_id, recruiter_id, public_jobs(id,job_title,departments(name)))))',
    )
    .eq('id', request_id)
    .single()
    .throwOnError();

  return data?.applications?.request ?? [];
};

export const applicantRequest = privateProcedure.input(schema).query(query);
