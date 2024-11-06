import { type DatabaseTableUpdate } from '@aglint/shared-types';
import { z, type ZodSchema } from 'zod';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';

type Input = ZodSchema<
  Pick<
    DatabaseTableUpdate['request_note'],
    'id' | 'note' | 'pinned' | 'request_id' | 'updated_at'
  >
>;

const requestUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  note: z.string().optional().nullable(),
  pinned: z.boolean().optional(),
  request_id: z.string().uuid(),
  updated_at: z.string().optional(),
}) satisfies Input;

const query = async ({
  input,
  ctx,
}: PrivateProcedure<typeof requestUpdateSchema>) => {
  const db = ctx.db;
  const { data } = await db
    .from('request_note')
    .upsert(input)
    .select()
    .order('created_at', { ascending: true })
    .throwOnError();

  return data ? data[0] : null;
};

export const updateNote = privateProcedure
  .input(requestUpdateSchema)
  .mutation(query);

export type UpdateNote = ProcedureDefinition<typeof updateNote>;
