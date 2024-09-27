import type { ZodTypeToSchema } from '@aglint/shared-types';
import { z } from 'zod';

import { type ATSProcedure, atsProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

import { syncDepartments } from './process';

type Params = Pick<Parameters<typeof syncDepartments>[0], 'recruiter_id'>;

const schema = z.object({
  job_id: z.string().uuid(),
  recruiter_id: z.string().uuid(),
}) satisfies ZodTypeToSchema<Params>;

const mutation = async ({ ctx, input }: ATSProcedure<typeof schema>) => {
  const adminDb = createPublicClient();
  return await syncDepartments({
    decryptKey: ctx.decryptKey,
    recruiter_id: input.recruiter_id,
    supabaseAdmin: adminDb,
  });
};

export const departments = atsProcedure.input(schema).mutation(mutation);
