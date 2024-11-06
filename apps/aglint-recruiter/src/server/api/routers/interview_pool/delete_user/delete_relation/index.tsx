import { z } from 'zod';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';

const schema = z.object({
  relation_id: z.string(),
});

const mutation = async ({
  input: { relation_id },
  ctx,
}: PrivateProcedure<typeof schema>) => {
  const db = ctx.db;
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

export type DeleteModuleRelation = ProcedureDefinition<
  typeof deleteModuleRelation
>;
