import { customInterviewModuleUpdateSchema } from '@aglint/shared-types/src/db/tables/interview_module';
import { z } from 'zod';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const schema = customInterviewModuleUpdateSchema.extend({
  id: z.string().uuid(),
});

const mutation = async ({
  input,
  ctx: { recruiter_id },
}: PrivateProcedure<typeof schema>) => {
  const db = createPrivateClient();

  await db
    .from('interview_module')
    .update({ ...input })
    .eq('id', input.id)
    .eq('recruiter_id', recruiter_id);

  return true;
};

export const updateInterviewPool = privateProcedure
  .input(schema)
  .mutation(mutation);

export type UpdateInterviewPool = ProcedureDefinition<
  typeof updateInterviewPool
>;
