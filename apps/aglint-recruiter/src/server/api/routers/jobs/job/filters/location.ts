import type { DatabaseFunctions, ZodTypeToSchema } from '@aglint/shared-types';
import { z } from 'zod';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';

type Params = DatabaseFunctions['get_applicant_locations']['Args'];

const schema = z.object({
  job_id: z.string().uuid(),
}) satisfies ZodTypeToSchema<Params>;

const query = async ({ input, ctx }: PrivateProcedure<typeof schema>) => {
  const db = ctx.db;
  return (
    (await db.rpc('get_applicant_locations', input).single()).data?.locations ??
    null
  );
};

export const locations = privateProcedure.input(schema).query(query);

export type Locations = ProcedureDefinition<typeof locations>;
