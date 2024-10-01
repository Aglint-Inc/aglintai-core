import { z } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const schema = z.object({
  relation_id: z.string(),
});

const mutation = async ({
  input: { relation_id },
}: PrivateProcedure<typeof schema>) => {
  const db = createPrivateClient();
  await db
    .from('interview_module_relation')
    .delete()
    .eq('id', relation_id)
    .throwOnError();
  return true;
};

export const deleteModuleRelation = privateProcedure
  .input(schema)
  .mutation(mutation);
