import { schedulesSupabase } from 'src/app/_common/utils/schedules-query';
import { z } from 'zod';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const schedulesPoolSchema = z.object({
  module_id: z.string().uuid(),
  filter: z.array(z.string()).optional(),
});

const query = async ({
  input: { module_id, filter },
}: PrivateProcedure<typeof schedulesPoolSchema>) => {
  const db = await createPrivateClient();
  const query = schedulesSupabase(db)
    .eq('module_id', module_id)
    .eq('meeting_interviewers.is_confirmed', true);
  if (typeof filter === 'string' || Array.isArray(filter)) {
    if (typeof filter === 'string') query.eq('status', filter);
    else if (Array.isArray(filter)) query.in('status', filter);
  }
  const { data } = await query.throwOnError();
  return data;
};

export const schedulesPool = privateProcedure
  .input(schedulesPoolSchema)
  .query(query);

export type SchedulesPool = ProcedureDefinition<typeof schedulesPool>;
