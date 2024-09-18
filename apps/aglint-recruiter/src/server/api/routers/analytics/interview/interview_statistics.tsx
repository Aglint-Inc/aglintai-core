import { z } from 'zod';

import { privateProcedure } from '../../../trpc';

const body = z.object({
  module_id: z.string().uuid(),
});

export const interview_statistics = privateProcedure
  .input(body)
  .query(async ({ input, ctx: { adminDb } }) => {
    const {  module_id } = input;
    const data = (
      await adminDb
        .rpc('per_module_interview_statistics', {
          module_id,
        })
        .throwOnError()
    ).data;
    return data[0];
  });
