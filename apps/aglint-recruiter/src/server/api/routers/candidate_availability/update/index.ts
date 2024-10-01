import { type DatabaseTableUpdate } from '@aglint/shared-types';
import { dateSlotsTypeSchema } from '@aglint/shared-types/src/db/tables/candidate_request_availability.type';
import { z, type ZodSchema } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

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
}); // satisfies Input;
const query = async ({ input }: PrivateProcedure<typeof updateSchema>) => {
  const { id, ...rest } = input;
  const db = createPrivateClient();
  return (
    await db
      .from('candidate_request_availability')
      .update({
        date_range: rest.date_range,
        ...rest,
      })
      .eq('id', id)
  ).data;
};

export const update = privateProcedure
  .input(updateSchema)
  .mutation(query);
