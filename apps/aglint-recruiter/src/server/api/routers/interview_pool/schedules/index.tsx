import _ from 'lodash';
import { z } from 'zod';

import { schedulesSupabase } from '@/components/Scheduling/schedules-query';
import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';

const schedulesPoolSchema = z.object({
  module_id: z.string().uuid(),
  filter: z.array(z.string()).optional(),
});

const query = async ({
  ctx: { db },
  input: { module_id, filter },
}: PrivateProcedure<typeof schedulesPoolSchema>) => {
  const query = schedulesSupabase(db)
    .eq('module_id', module_id)
    .eq('meeting_interviewers.is_confirmed', true);
  if (typeof filter === 'string' || _.isArray(filter)) {
    if (typeof filter === 'string') query.eq('status', filter);
    else if (_.isArray(filter)) query.in('status', filter);
  }
  const { data } = await query.throwOnError();
  return data;
};

export const schedulesPool = privateProcedure
  .input(schedulesPoolSchema)
  .query(query);
