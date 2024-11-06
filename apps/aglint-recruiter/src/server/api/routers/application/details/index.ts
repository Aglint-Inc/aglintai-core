import { z } from 'zod';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';

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

export type ApplicationDetails = ProcedureDefinition<typeof applicationDetails>;

const getApplicationDetails = async (
  args: PrivateProcedure<typeof applicationDetailsSchema>,
) => {
  const {
    input: { application_id },
    ctx: { db },
  } = args;
  const resp = (
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

  return resp && resp?.public_jobs?.status && resp?.candidate_files?.resume_json
    ? {
        score_json: resp?.score_json,
        resume_json: resp?.candidate_files?.resume_json,
        status: resp?.status,
        job_status: resp?.public_jobs?.status,
      }
    : null;
};
