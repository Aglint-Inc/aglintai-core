import { z } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const schema = z.object({ request_id: z.string().uuid() });

const query = async ({ input }: PrivateProcedure<typeof schema>) => {
  const db = createPrivateClient();

  const { data } = await db
    .from('request_note')
    .select('*')
    .eq('request_id', input.request_id)
    .single()
    .throwOnError();
  return data;
};

export const read = privateProcedure.input(schema).query(query);
