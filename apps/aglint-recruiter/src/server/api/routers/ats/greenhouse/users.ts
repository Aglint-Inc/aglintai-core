import type { ZodTypeToSchema } from '@aglint/shared-types';
import { z } from 'zod';

import { syncUsers } from '@/api/sync/greenhouse/user/process';
import {
  type GreenhouseProcedure,
  greenhouseProcedure,
} from '@/server/api/trpc';

type Params = Pick<Parameters<typeof syncUsers>[0], 'recruiter_id'>;

const schema = z.object({
  recruiter_id: z.string().uuid(),
}) satisfies ZodTypeToSchema<Params>;

const mutation = async ({ ctx, input }: GreenhouseProcedure<typeof schema>) => {
  return await syncUsers({
    decryptKey: ctx.decryptKey,
    recruiter_id: input.recruiter_id,
    supabaseAdmin: ctx.adminDb,
    last_sync: ctx.greenhouse_metadata?.last_sync?.users ?? null,
  });
};

export const users = greenhouseProcedure.input(schema).mutation(mutation);
