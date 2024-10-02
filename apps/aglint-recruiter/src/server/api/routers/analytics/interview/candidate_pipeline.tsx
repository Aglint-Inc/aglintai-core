import { z } from 'zod';

import { createPublicClient } from '@/server/db';

import { privateProcedure } from '../../../trpc';

const body = z.object({
  module_id: z.string().uuid(),
});

export const candidate_pipeline = privateProcedure
  .input(body)
  .query(async ({ input }) => {
    const adminDb = createPublicClient();
    const { module_id } = input;
    const data = (
      await adminDb
        .rpc('per_module_candidate_pipeline', {
          module_id,
        })
        .throwOnError()
    ).data!;
    return data[0];
  });
