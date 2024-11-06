import { z } from 'zod';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';

const applicationActivitySchema = z.object({
  application_id: z.string().uuid(),
});

const query = async (
  ctx: PrivateProcedure<typeof applicationActivitySchema>,
) => {
  return await getApplicationActivity(ctx);
};

export const applicationActivity = privateProcedure
  .input(applicationActivitySchema)
  .query(query);

const getApplicationActivity = async (
  ctx: PrivateProcedure<typeof applicationActivitySchema>,
) => {
  const {
    ctx: { db },
    input: { application_id },
  } = ctx;

  return (
    await db
      .from('application_logs')
      .select('*, recruiter_user(first_name, last_name, profile_image)')
      .eq('application_id', application_id)
      .order('created_at', { ascending: false })
      .throwOnError()
  ).data;
};

export type ApplicationActivity = ProcedureDefinition<
  typeof applicationActivity
>;
