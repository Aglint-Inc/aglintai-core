import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import {
  type ProcedureDefinition,
  type PublicProcedure,
  publicProcedure,
} from '@/server/api/trpc';

const schema = z.object({
  candidate_request_availability_id: z.string().uuid(),
});

const query = async ({ input, ctx }: PublicProcedure<typeof schema>) => {
  const db = ctx.adminDb;
  const data = (
    await db
      .from('candidate_request_availability')
      .select(
        '*,request_session_relation(interview_session(*)),applications!inner(candidate_id,candidates!inner(*),public_jobs!inner(job_title,job_type,office_locations(city,region,country))),recruiter!inner(id,logo,name)',
      )
      .eq('id', input.candidate_request_availability_id)
      .single()
      .throwOnError()
  ).data;
  if (!data)
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Candidate Request not found',
    });
  return data;
};

export const getCandidateAvailabilityData = publicProcedure
  .input(schema)
  .query(query);

export type GetCandidateAvailabilityData = ProcedureDefinition<
  typeof getCandidateAvailabilityData
>;
