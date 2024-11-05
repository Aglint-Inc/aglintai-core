import { z } from 'zod';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';

const schema = z.object({
  candidate_availability_id: z.string().uuid(),
});

const query = async ({ input, ctx }: PrivateProcedure<typeof schema>) => {
  const { candidate_availability_id } = input;
  const db = ctx.db;
  return (
    await db
      .from('candidate_request_availability')
      .select('*')
      .eq('id', candidate_availability_id)
      .single()
      .throwOnError()
  ).data;
};

export const readCandidateAvailability = privateProcedure
  .input(schema)
  .query(query);

export type ReadCandidateAvailability = ProcedureDefinition<
  typeof readCandidateAvailability
>;
