import { z } from 'zod';

import { privateProcedure } from '../../../trpc';

const body = z.object({
  module_id: z.string().uuid(),
});

export const interviewer_performance = privateProcedure
  .input(body)
  .query(async ({ input, ctx: { adminDb } }) => {
    const {  module_id } = input;
    const data = (
      await adminDb
        .rpc('per_module_interviewer_performance', {
          module_id,
        })
        .throwOnError()
    ).data;
    return data[0];
  });
