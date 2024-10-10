import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import type { z } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

import { hiringTeamSchema } from '../../common/schema';

const schema = hiringTeamSchema;

const mutation = async ({
  input: { id, ...payload },
  ctx,
}: PrivateProcedure<typeof schema>): Promise<HiringTeam['output']> => {
  const db = createPrivateClient();
  return await db
    .from('public_jobs')
    .update(payload)
    .eq('id', id)
    .eq('recruiter_id', ctx.recruiter_id)
    .throwOnError();
};

export const hiring_team = privateProcedure.input(schema).mutation(mutation);

export type HiringTeam = {
  input: z.infer<typeof schema>;
  output: PostgrestSingleResponse<null>;
};