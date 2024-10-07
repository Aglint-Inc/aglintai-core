import { z } from 'zod';

import { type PublicProcedure, publicProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

const updateProfileSchema = z.object({
  application_id: z.string(),
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
}: PublicProcedure<typeof updateProfileSchema>) => {
  const { application_id, ...payload } = input;

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

export const updateProfile = publicProcedure
  .input(updateProfileSchema)
  .mutation(query);
