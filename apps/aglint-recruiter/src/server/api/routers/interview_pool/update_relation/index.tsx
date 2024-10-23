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
  const db = await createPrivateClient();

  await db
    .from('interview_module_relation')
    .update({ ...input })
    .eq('id', recruiter_id);
};

export const updateInterviewPoolRelation = privateProcedure
  .input(schema)
  .mutation(mutation);

export type UpdateInterviewPoolRelation = ProcedureDefinition<
  typeof updateInterviewPoolRelation
>;
