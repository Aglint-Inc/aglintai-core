import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

import { profileScoreSchema } from '../../common/schema';

const schema = profileScoreSchema;

const mutation = async ({
  input: { id, ...payload },
  ctx,
}: PrivateProcedure<typeof schema>) => {
  const db = await createPrivateClient();
  return await db
    .from('public_jobs')
    .update(payload)
    .eq('recruiter_id', ctx.recruiter_id)
    .eq('id', id)
    .throwOnError();
};

export const profile_score = privateProcedure.input(schema).mutation(mutation);

export type ProfileScore = ProcedureDefinition<typeof profile_score>;
