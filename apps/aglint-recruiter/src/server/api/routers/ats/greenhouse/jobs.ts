import type { ZodTypeToSchema } from '@aglint/shared-types';
import { z } from 'zod';

import { syncGreenhouseJob } from '@/api/sync/greenhouse/jobs/process';
import {
  type GreenhouseProcedure,
  greenhouseProcedure,
} from '@/server/api/trpc';

type Params = Pick<Parameters<typeof syncGreenhouseJob>[0], 'recruiter_id'>;

const schema = z.object({
  recruiter_id: z.string().uuid(),
}) satisfies ZodTypeToSchema<Params>;

const mutation = async ({ ctx, input }: GreenhouseProcedure<typeof schema>) => {
  return await syncGreenhouseJob({
    decryptKey: ctx.decryptKey,
    recruiter_id: input.recruiter_id,
    supabaseAdmin: ctx.adminDb,
    last_sync: ctx.greenhouse_metadata?.last_sync?.jobs ?? null,
  });
};

export const jobs = greenhouseProcedure.input(schema).mutation(mutation);