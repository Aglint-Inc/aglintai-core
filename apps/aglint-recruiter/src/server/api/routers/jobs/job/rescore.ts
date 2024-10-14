import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const schema = z.object({
  id: z.string().uuid(),
});

const mutation = async ({ input }: PrivateProcedure<typeof schema>) => {
  const db = createPrivateClient();
  const response = (
    await db
      .from('public_jobs')
      .select('draft_jd_json, scoring_criteria_loading')
      .eq('id', input.id)
      .single()
      .throwOnError()
  ).data;
  if (!response)
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Job not found',
    });
  if (response.scoring_criteria_loading)
    throw new TRPCError({
      code: 'FORBIDDEN',
      cause: 'Scoring criteria for this job is still under generation',
    });
  return await db
    .from('public_jobs')
    .update({ jd_json: response.draft_jd_json });
};

export const rescore = privateProcedure.input(schema).mutation(mutation);
