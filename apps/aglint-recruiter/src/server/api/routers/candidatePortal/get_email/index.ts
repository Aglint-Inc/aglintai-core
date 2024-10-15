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
      .select('id,candidates!inner(email)')
      .eq('id', application_id)
      .single()
      .throwOnError()
  ).data!;

  return { email: data.candidates.email, application_id: data.id }!;
};

export const getEmail = publicProcedure.input(schema).query(query);

export type GetEmail = ProcedureDefinition<typeof getEmail>;
