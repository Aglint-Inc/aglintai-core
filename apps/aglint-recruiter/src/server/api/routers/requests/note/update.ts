import { type DatabaseTableUpdate } from '@aglint/shared-types';
import { z, type ZodSchema } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

type Input = ZodSchema<
  Pick<
    DatabaseTableUpdate['request_note'],
    'id' | 'note' | 'pinned' | 'request_id'
  >
>;

const requestUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  note: z.string().optional().nullable(),
  pinned: z.boolean().optional(),
  request_id: z.string().uuid(),
}) satisfies Input;

const query = async ({
  input,
}: PrivateProcedure<typeof requestUpdateSchema>) => {
  const db = createPrivateClient();
  return (
    await db.from('request_note').upsert(input).select().single().throwOnError()
  ).data;
};

export const updateNote = privateProcedure
  .input(requestUpdateSchema)
  .mutation(query);
