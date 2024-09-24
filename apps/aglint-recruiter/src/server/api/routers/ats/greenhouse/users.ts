import type { ZodTypeToSchema } from '@aglint/shared-types';
import { z } from 'zod';

import { syncUsers } from '@/api/sync/greenhouse/user/process';
import { type ATSProcedure, atsProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

type Params = Pick<Parameters<typeof syncUsers>[0], 'recruiter_id'>;

const schema = z.object({
  recruiter_id: z.string().uuid(),
}) satisfies ZodTypeToSchema<Params>;

const mutation = async ({ ctx, input }: ATSProcedure<typeof schema>) => {
  const adminDb = createPublicClient();
  return await syncUsers({
    decryptKey: ctx.decryptKey,
    recruiter_id: input.recruiter_id,
    supabaseAdmin: adminDb,
    last_sync: ctx.greenhouse_metadata?.last_sync?.users ?? null,
  });
};

export const users = atsProcedure.input(schema).mutation(mutation);
