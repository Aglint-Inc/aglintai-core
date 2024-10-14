import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import { type z } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

import { profileScoreSchema } from '../../common/schema';

const schema = profileScoreSchema;

const mutation = async ({
  input: { id, ...payload },
  ctx,
}: PrivateProcedure<typeof schema>): Promise<ProfileScore['output']> => {
  const db = createPrivateClient();
  return await db
    .from('public_jobs')
    .update(payload)
    .eq('recruiter_id', ctx.recruiter_id)
    .eq('id', id)
    .throwOnError();
};

export const profile_score = privateProcedure.input(schema).mutation(mutation);

export type ProfileScore = {
  input: z.infer<typeof schema>;
  output: PostgrestSingleResponse<null>;
};
