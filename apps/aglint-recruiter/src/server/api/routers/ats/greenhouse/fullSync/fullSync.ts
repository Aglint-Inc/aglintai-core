import type { ZodTypeToSchema } from '@aglint/shared-types';
import { z } from 'zod';

// import { runFullSync } from '@/api/sync/greenhouse/full_db/process';
import { type ATSProcedure, atsProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

import { runFullSync } from './process';

type Params = Pick<Parameters<typeof runFullSync>[0], 'recruiter_id'>;

const schema = z.object({
  recruiter_id: z.string().uuid(),
}) satisfies ZodTypeToSchema<Params>;

const mutation = async ({ ctx, input }: ATSProcedure<typeof schema>) => {
  const adminDb = createPublicClient();
  return await runFullSync({
    decryptKey: ctx.decryptKey,
    recruiter_id: input.recruiter_id,
    supabaseAdmin: adminDb,
    syncData: ctx.greenhouse_metadata,
  });
};

export const fullSync = atsProcedure.input(schema).mutation(mutation);
