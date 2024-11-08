import { z } from 'zod';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';

const schema = z.object({
  location_id: z.number(),
});

const mutation = async ({ input, ctx }: PrivateProcedure<typeof schema>) => {
  const db = ctx.db;
  await db
    .from('office_locations')
    .delete()
    .eq('id', input.location_id)
    .eq('recruiter_id', ctx.recruiter_id)
    .throwOnError();
};

export const deleteLocation = privateProcedure.input(schema).mutation(mutation);

export type DeleteLocation = ProcedureDefinition<typeof deleteLocation>;
