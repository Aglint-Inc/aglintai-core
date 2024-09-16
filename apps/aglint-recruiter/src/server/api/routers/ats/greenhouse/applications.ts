import type { ZodTypeToSchema } from '@aglint/shared-types';
import { z } from 'zod';

import { syncGreenhouseApplication } from '@/api/sync/greenhouse/applications/process';
import { type ATSProcedure, atsProcedure } from '@/server/api/trpc';

type Params = Pick<
  Parameters<typeof syncGreenhouseApplication>[0],
  'job_id' | 'recruiter_id'
>;

const schema = z.object({
  job_id: z.string().uuid(),
  recruiter_id: z.string().uuid(),
}) satisfies ZodTypeToSchema<Params>;

export const greenhouseJobMutation = async ({
  ctx,
  input,
}: ATSProcedure<typeof schema>) => {
  const { remote_id, remote_sync_time } = (
    await ctx.adminDb
      .from('public_jobs')
      .select('remote_id, remote_sync_time')
      .eq('id', input.job_id)
      .single()
      .throwOnError()
  ).data;
  return await syncGreenhouseApplication({
    decryptKey: ctx.decryptKey,
    job_id: input.job_id,
    recruiter_id: input.recruiter_id,
    remote_id: Number(remote_id),
    supabaseAdmin: ctx.adminDb,
    last_sync: remote_sync_time,
  });
};

export const applications = atsProcedure
  .input(schema)
  .mutation(greenhouseJobMutation);
