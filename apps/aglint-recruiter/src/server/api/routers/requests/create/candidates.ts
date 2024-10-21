import { z } from 'zod';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

export const schema = z.object({
  job_id: z.string().uuid(),
  search: z.string().optional(),
  limit: z.number().min(1).nullish(),
  cursor: z.number().nullish(),
});

const pageSize = 9;

const query = async ({ input }: PrivateProcedure<typeof schema>) => {
  const db = createPrivateClient();
  const cursor = input?.cursor ?? 0;
  const query = db
    .from('application_view')
    .select('id, name', { count: 'exact' })
    .range(cursor, cursor + pageSize)
    .eq('job_id', input.job_id)
    .neq('status', 'disqualified');
  if (input.search) query.ilike('name', `%${input.search}%`);
  query.order('id');
  const { data, count } = await query.throwOnError();
  const safeData = (data ?? []).map(({ id, name }, i) => ({
    id,
    label: name,
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

export const candidates = privateProcedure.input(schema).query(query);

export type Candidates = ProcedureDefinition<typeof candidates>;
