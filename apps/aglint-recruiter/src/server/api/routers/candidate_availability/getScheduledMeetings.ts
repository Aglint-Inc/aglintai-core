import { z } from 'zod';

import { createPublicClient } from '@/server/db';

import {
  type ProcedureDefinition,
  type PublicProcedure,
  publicProcedure,
} from '../../trpc';

const schema = z.object({
  application_id: z.string().uuid(),
});

const query = async ({ input }: PublicProcedure<typeof schema>) => {
  const db = createPublicClient();
  const { application_id } = input;

  const { data: sch, error: errSch } = await db
    .from('applications')
    .select(
      '*,public_jobs(id,job_title,recruiter_id),candidates(*),candidate_files(id,file_url,candidate_id,resume_json,type),recruiter(id,logo,name)',
    )
    .eq('id', application_id)
    .single();
  if (!errSch) {
    return sch;
  }
};

export const getScheduledMeetings = publicProcedure.input(schema).query(query);

export type GetScheduledMeetings = ProcedureDefinition<
  typeof getScheduledMeetings
>;
