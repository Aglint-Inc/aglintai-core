import { z } from 'zod';

import {
  type CandidatePortalProcedure,
  candidatePortalProcedure,
  type ProcedureDefinition
} from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

const updateProfileSchema = z.object({
  avatar: z.string().optional().nullable(),
  first_name: z.string(),
  last_name: z.string().optional(),
  email: z.string().email(),
  phone: z.string(),
  linkedin: z.string().optional(),
  timezone: z.string(),
});

const query = async ({
  input,
  ctx: { application_id },
}: CandidatePortalProcedure<typeof updateProfileSchema>) => {
  const { ...payload } = input;

  const db = createPublicClient();

  const { candidate_id } = (
    await db
      .from('applications')
      .select('candidate_id')
      .eq('id', application_id)
      .single()
      .throwOnError()
  ).data!;

  await db
    .from('candidates')
    .update({ ...payload })
    .eq('id', candidate_id || '')
    .throwOnError();
};

export const update_profile = candidatePortalProcedure
  .input(updateProfileSchema)
  .mutation(query);

export type UpdateProfile = ProcedureDefinition<typeof update_profile>;
