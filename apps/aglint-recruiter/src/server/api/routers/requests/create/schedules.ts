import { z } from 'zod';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

export const schema = z.object({
  application_id: z.string().uuid(),
  search: z.string().optional(),
  limit: z.number().min(1).nullish(),
  cursor: z.number().nullish(),
});

const pageSize = 9;

const query = async ({ input }: PrivateProcedure<typeof schema>) => {
  const db = await createPrivateClient();
  const cursor = input?.cursor ?? 0;
  const query = db
    .from('meeting_details')
    .select('session_id, session_name', {
      count: 'exact',
    })
    .range(cursor, cursor + pageSize)
    .eq('application_id', input.application_id);
  if (input.search) query.ilike('session_name', `%${input.search}%`);
  query.order('session_id');
  const { data, count } = await query.throwOnError();
  const safeData = (data ?? []).map(({ session_id, session_name }, i) => ({
    id: session_id,
    label: session_name,
    cursor: cursor + i,
  }));
  const nextCursor =
    cursor < (count ?? 0) && safeData[safeData.length - 1]
      ? safeData[safeData.length - 1].cursor + 1
      : null;
  return {
    items: safeData,
    nextCursor,
  };
};

export const schedules = privateProcedure.input(schema).query(query);

export type Schedules = ProcedureDefinition<typeof schedules>;
