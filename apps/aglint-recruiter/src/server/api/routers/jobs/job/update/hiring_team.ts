import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';

import { hiringTeamSchema } from '../../common/schema';

const schema = hiringTeamSchema;

const mutation = async ({
  input: { id, ...payload },
  ctx,
}: PrivateProcedure<typeof schema>) => {
  const db = ctx.db;
  return await db
    .from('public_jobs')
    .update(payload)
    .eq('recruiter_id', ctx.recruiter_id)
    .eq('id', id)
    .throwOnError();
};

export const hiring_team = privateProcedure.input(schema).mutation(mutation);

export type HiringTeam = ProcedureDefinition<typeof hiring_team>;
