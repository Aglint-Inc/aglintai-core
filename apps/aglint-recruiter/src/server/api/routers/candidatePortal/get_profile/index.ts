import {
  type CandidatePortalProcedure,
  candidatePortalProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

const query = async ({ ctx: { application_id } }: CandidatePortalProcedure) => {
  const db = createPublicClient();

  const data = (
    await db
      .from('applications')
      .select(
        'candidate_files(file_url),candidates!inner(id,first_name,last_name,linkedin,phone,avatar,timezone,email)',
      )
      .eq('id', application_id)
      .single()
      .throwOnError()
  ).data!;

  const { candidates } = data;

  return {
    resume_url: data?.candidate_files?.file_url || '',
    id: candidates.id,
    first_name: candidates.first_name,
    last_name: candidates.last_name || '',
    linkedin: candidates.linkedin || '',
    phone: candidates.phone || '',
    avatar: candidates.avatar || '',
    timezone: candidates.timezone || '',
    email: candidates.email,
  };
};

export const get_profile = candidatePortalProcedure.query(query);

export type GetProfile = ProcedureDefinition<typeof get_profile>;
