import { z } from 'zod';

import { createPublicClient } from '@/server/db';

import { privateProcedure } from '../../../trpc';

const body = z.object({
  module_id: z.string().uuid(),
});

export const interview_statistics = privateProcedure
  .input(body)
  .query(async ({ input }) => {
    const adminDb = createPublicClient();
    const { module_id } = input;
    const data = (
      await adminDb
        .rpc('per_module_interview_statistics', {
          module_id,
        })
        .throwOnError()
    ).data;

    if (!data) {
      return null;
    }
    return data[0];
  });
