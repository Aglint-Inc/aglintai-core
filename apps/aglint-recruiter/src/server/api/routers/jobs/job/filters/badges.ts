import type { DatabaseFunctions, ZodTypeToSchema } from '@aglint/shared-types';
import { z } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';

type Params = DatabaseFunctions['get_applicant_badges']['Args'];

const schema = z.object({
  job_id: z.string().uuid(),
}) satisfies ZodTypeToSchema<Params>;

const query = async ({ ctx, input }: PrivateProcedure<typeof schema>) =>
  (await ctx.db.rpc('get_applicant_badges', input).single()).data;

export const badges = privateProcedure.input(schema).query(query);
