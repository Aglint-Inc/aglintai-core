import { z } from 'zod';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const schema = z.object({
  type: z.string(),
  count: z.number(),
  module_relation_id: z.string().uuid(),
});

const mutation = async ({ input }: PrivateProcedure<typeof schema>) => {
  const db = await createPrivateClient();
  const { count, module_relation_id, type } = input;
  if (type === 'shadow') {
    await db
      .from('interview_module_relation')
      .update({
        number_of_shadow: count,
      })
      .eq('id', module_relation_id);
  } else {
    await db
      .from('interview_module_relation')
      .update({
        number_of_reverse_shadow: count,
      })
      .eq('id', module_relation_id);
  }
};

export const updatePoolTraning = privateProcedure
  .input(schema)
  .mutation(mutation);

export type UpdatePoolTraning = ProcedureDefinition<typeof updatePoolTraning>;
