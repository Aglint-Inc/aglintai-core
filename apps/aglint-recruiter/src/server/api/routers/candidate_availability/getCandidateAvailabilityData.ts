import { z } from 'zod';

import { createPublicClient } from '@/server/db';

import {
  type ProcedureDefinition,
  type PublicProcedure,
  publicProcedure,
} from '../../trpc';

const schema = z.object({
  candidate_request_availability_id: z.string().uuid(),
});

const query = async ({ input }: PublicProcedure<typeof schema>) => {
  const { candidate_request_availability_id } = input;
  const db = createPublicClient();
  if (candidate_request_availability_id) {
    const { data } = await db
      .from('candidate_request_availability')
      .select(
        '*,request_session_relation(interview_session(*)),applications!inner(candidate_id,candidates!inner(*),public_jobs!inner(job_title,job_type,office_locations(city,region,country))),recruiter!inner(id,logo,name)',
      )
      .eq('id', candidate_request_availability_id)
      .single()
      .throwOnError();
    if (data) return data;
  }
};

export const getCandidateAvailabilityData = publicProcedure
  .input(schema)
  .query(query);

export type GetCandidateAvailabilityData = ProcedureDefinition<
  typeof getCandidateAvailabilityData
>;
