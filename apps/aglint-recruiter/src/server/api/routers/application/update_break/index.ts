/* eslint-disable no-console */
import { z } from 'zod';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';

export const schema = z.object({
  break_duration: z.number(),
  session_id: z.string().uuid(),
});

const mutation = async ({
  input: { break_duration, session_id },
  ctx,
}: PrivateProcedure<typeof schema>) => {
  const db = ctx.db;
  await db
    .from('interview_session')
    .update({ break_duration: Number(break_duration) })
    .eq('id', session_id);

  return true;
};

export const updateBreak = privateProcedure.input(schema).mutation(mutation);

export type UpdateBreak = ProcedureDefinition<typeof updateBreak>;
