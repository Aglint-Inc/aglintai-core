import { type DatabaseTableUpdate } from '@aglint/shared-types';
import { dateSlotsTypeSchema } from '@aglint/shared-types/src/db/tables/candidate_request_availability.type';
import { z, type ZodSchema } from 'zod';

import { type PublicProcedure, publicProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

// eslint-disable-next-line no-unused-vars
type Input = ZodSchema<
  Pick<
    DatabaseTableUpdate['candidate_request_availability'],
    | 'id'
    | 'booking_confirmed'
    | 'slots'
    | 'number_of_days'
    | 'number_of_slots'
    | 'total_slots'
    | 'date_range'
    | 'visited'
    | 'user_timezone'
  >
>;

export const updateSchema = z.object({
  id: z.string().uuid(),
  booking_confirmed: z.boolean().optional(),
  slots: dateSlotsTypeSchema.nullish(),
  number_of_days: z.number().optional(),
  number_of_slots: z.number().optional(),
  total_slots: z.number().optional(),
  date_range: z.array(z.string()).optional(),
  visited: z.boolean().optional(),
  user_timezone: z.string().optional(),
}); // satisfies Input;
const query = async ({ input }: PublicProcedure<typeof updateSchema>) => {
  const { id, ...rest } = input;
  const db = createPublicClient();
  return (
    await db
      .from('candidate_request_availability')
      .update({
        date_range: rest.date_range,
        ...rest,
      })
      .eq('id', id)
      .select()
      .single()
      .throwOnError()
  ).data;
};

export const update = publicProcedure.input(updateSchema).mutation(query);
