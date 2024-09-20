import { z } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';

const applicationDetailsSchema = z.object({
  application_id: z.string().uuid(),
});

const query = async (
  ctx: PrivateProcedure<typeof applicationDetailsSchema>,
) => {
  return await getApplicationDetails(ctx);
};

export const applicationDetails = privateProcedure
  .input(applicationDetailsSchema)
  .query(query);

const getApplicationDetails = async (
  ctx: PrivateProcedure<typeof applicationDetailsSchema>,
) => {
  const {
    ctx: { db },
    input: { application_id },
  } = ctx;
  const { candidate_files, score_json, public_jobs, status } = (
    await db
      .from('applications')
      .select(
        'score_json, overall_score, processing_status, candidate_files(resume_json),status,public_jobs(id,status)',
      )
      .eq('id', application_id)
      .not('candidate_files.resume_json', 'is', null)
      .single()
      .throwOnError()
  ).data;
  return {
    score_json,
    resume_json: candidate_files?.resume_json,
    status,
    job_status: public_jobs?.status,
  };
};
