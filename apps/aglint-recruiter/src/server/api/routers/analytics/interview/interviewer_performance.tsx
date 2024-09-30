import { z } from 'zod';

import { createPublicClient } from '@/server/db';

import { privateProcedure } from '../../../trpc';

const body = z.object({
  module_id: z.string().uuid(),
});

export const interviewer_performance = privateProcedure
  .input(body)
  .query(async ({ input }) => {
    const adminDb = createPublicClient();
    const { module_id } = input;
    const data = (
      await adminDb
        .rpc('per_module_interviewer_performance', {
          module_id,
        })
        .throwOnError()
    ).data;

    if (!data) {
      return null;
    }

    return data[0];
  });
