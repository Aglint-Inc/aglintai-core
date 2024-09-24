import { z } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

export const schema = z.object({
  recruiter_id: z.string().uuid(),
  search: z.string().optional(),
  limit: z.number().min(1).nullish(),
  cursor: z.number().nullish(),
});

const pageSize = 9;

const query = async ({ input }: PrivateProcedure<typeof schema>) => {
  const db = createPrivateClient();
  const cursor = input?.cursor ?? 0;
  const query = db
    .from('public_jobs')
    .select('id, job_title', { count: 'exact' })
    .range(cursor, cursor + pageSize)
    .eq('recruiter_id', input.recruiter_id);
  if (input.search) query.ilike('job_title', `%${input.search}%`);
  query.order('id');
  const { data, count } = await query.throwOnError();
  const safeData = data.map(({ id, job_title }, i) => ({
    id,
    label: job_title,
    cursor: cursor + i,
  }));
  const nextCursor =
    cursor < count && safeData[safeData.length - 1]
      ? safeData[safeData.length - 1].cursor + 1
      : null;
  return {
    items: safeData,
    nextCursor,
  };
};

export const jobs = privateProcedure.input(schema).query(query);
