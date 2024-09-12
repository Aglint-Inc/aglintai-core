import { z } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';

export const schema = z.object({
  job_id: z.string().uuid(),
  search: z.string().optional(),
  limit: z.number().min(1).nullish(),
  cursor: z.number().nullish(),
});

const pageSize = 9;

const query = async ({ ctx, input }: PrivateProcedure<typeof schema>) => {
  const cursor = input?.cursor ?? 0;
  const query = ctx.db
    .from('interview_plan')
    .select('job_id, application_id, interview_session(id, name)', {
      count: 'exact',
    })
    .range(cursor, cursor + pageSize)
    .is('application_id', null)
    .eq('job_id', input.job_id);
  if (input.search) query.ilike('interview_session.name', `%${input.search}%`);
  query.order('id');
  const { data, count } = await query.throwOnError();
  const safeData = data
    .flatMap(({ interview_session }) => interview_session)
    .map((data, i) => ({
      ...data,
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

export const schedules = privateProcedure.input(schema).query(query);
