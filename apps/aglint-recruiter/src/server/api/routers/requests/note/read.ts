import { z } from 'zod';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';

const schema = z.object({ request_id: z.string().uuid() });

const query = async ({ input, ctx }: PrivateProcedure<typeof schema>) => {
  const db = ctx.db;

  const { data } = await db
    .from('request_note')
    .select('*')
    .eq('request_id', input.request_id)
    .order('created_at', { ascending: true })
    .throwOnError();
  return data ? (data[0] ?? null) : null;
};

export const read = privateProcedure.input(schema).query(query);

export type Read = ProcedureDefinition<typeof read>;
