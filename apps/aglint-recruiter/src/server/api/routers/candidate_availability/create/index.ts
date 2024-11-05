import { type DatabaseTableInsert } from '@aglint/shared-types';
import { availabilityTypeSchema } from '@aglint/shared-types/src/db/tables/candidate_request_availability.type';
import { z, type ZodSchema } from 'zod';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';

type Input = ZodSchema<
  Pick<
    DatabaseTableInsert['candidate_request_availability'],
    | 'application_id'
    | 'recruiter_id'
    | 'availability'
    | 'date_range'
    | 'is_task_created'
    | 'number_of_days'
    | 'number_of_slots'
    | 'total_slots'
    | 'request_id'
  >
>;
const schema = z.object({
  application_id: z.string().uuid(),
  recruiter_id: z.string().uuid(),
  availability: availabilityTypeSchema,
  date_range: z.array(z.string()),
  is_task_created: z.boolean().nullable(),
  number_of_days: z.number().nullable(),
  number_of_slots: z.number().nullable(),
  total_slots: z.number().nullable(),
  request_id: z.string().uuid(),
}) satisfies Input;

const query = async ({ input, ctx }: PrivateProcedure<typeof schema>) => {
  const db = ctx.db;
  return (
    await db
      .from('candidate_request_availability')
      .insert({ ...input })
      .select()
      .single()
      .throwOnError()
  ).data;
};

export const create = privateProcedure.input(schema).mutation(query);

export type Create = ProcedureDefinition<typeof create>;
