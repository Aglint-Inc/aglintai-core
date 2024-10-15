import { z } from 'zod';

import {
  type ProcedureDefinition,
  type PublicProcedure,
  publicProcedure,
} from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

const schema = z.object({
  application_id: z.string().uuid(),
});

const query = async ({ input }: PublicProcedure<typeof schema>) => {
  const { application_id } = input;

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
    ...candidates,
  };
};

export const getProfile = publicProcedure.input(schema).query(query);

export type GetProfile = ProcedureDefinition<typeof getProfile>;
