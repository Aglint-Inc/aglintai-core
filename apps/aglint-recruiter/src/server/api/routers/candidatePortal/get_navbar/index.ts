import {
  type CandidatePortalProcedure,
  candidatePortalProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

const query = async ({ ctx: { application_id } }: CandidatePortalProcedure) => {
  const db = createPublicClient();

  const company = (
    await db
      .from('applications')
      .select(
        'candidates!inner(avatar,first_name,last_name,recruiter!inner(name,logo))',
      )
      .eq('id', application_id)
      .throwOnError()
      .single()
  ).data!;

  const candidates = company.candidates;

  return {
    candidate: {
      first_name: candidates.first_name,
      last_name: candidates.last_name,
      avatar: candidates.avatar,
    },
    company: candidates.recruiter,
  };
};

export const get_navbar = candidatePortalProcedure.query(query);

export type GetNav = ProcedureDefinition<typeof get_navbar>;
