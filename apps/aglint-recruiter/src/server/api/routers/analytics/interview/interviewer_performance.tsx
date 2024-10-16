import { z } from 'zod';

import { privateProcedure, type ProcedureDefinition } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

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
    ).data!;
    return data[0];
  });

export type InterviewerPerformance = ProcedureDefinition<
  typeof interviewer_performance
>;
