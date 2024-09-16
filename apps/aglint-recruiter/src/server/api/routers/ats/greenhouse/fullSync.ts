import type { ZodTypeToSchema } from '@aglint/shared-types';
import { z } from 'zod';

import { runFullSync } from '@/api/sync/greenhouse/full_db/process';
import {
  type GreenhouseProcedure,
  greenhouseProcedure,
} from '@/server/api/trpc';

type Params = Pick<Parameters<typeof runFullSync>[0], 'recruiter_id'>;

const schema = z.object({
  recruiter_id: z.string().uuid(),
}) satisfies ZodTypeToSchema<Params>;

const mutation = async ({ ctx, input }: GreenhouseProcedure<typeof schema>) => {
  return await runFullSync({
    decryptKey: ctx.decryptKey,
    recruiter_id: input.recruiter_id,
    supabaseAdmin: ctx.adminDb,
    syncData: ctx.greenhouse_metadata,
  });
};

export const fullSync = greenhouseProcedure.input(schema).mutation(mutation);
