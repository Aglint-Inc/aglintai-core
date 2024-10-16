import { z } from 'zod';

import { type PublicProcedure, publicProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

const schema = z.object({
  application_id: z.string().uuid(),
});

const query = async ({ input }: PublicProcedure<typeof schema>) => {
  const { application_id } = input;

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

export const getNav = publicProcedure.input(schema).query(query);
