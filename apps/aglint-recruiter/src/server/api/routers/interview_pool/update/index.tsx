import { customInterviewModuleUpdateSchema } from '@aglint/shared-types/src/db/tables/interview_module';
import { z } from 'zod';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';

const schema = customInterviewModuleUpdateSchema.extend({
  id: z.string().uuid(),
});

const mutation = async ({ input, ctx }: PrivateProcedure<typeof schema>) => {
  const db = ctx.db;

  await db
    .from('interview_module')
    .update({ ...input })
    .eq('id', input.id)
    .eq('recruiter_id',  ctx.recruiter_id);

  return true;
};

export const updateInterviewPool = privateProcedure
  .input(schema)
  .mutation(mutation);

export type UpdateInterviewPool = ProcedureDefinition<
  typeof updateInterviewPool
>;
