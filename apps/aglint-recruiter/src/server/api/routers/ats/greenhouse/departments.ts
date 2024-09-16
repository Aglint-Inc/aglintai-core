import type { ZodTypeToSchema } from '@aglint/shared-types';
import { z } from 'zod';

import { syncDepartments } from '@/api/sync/greenhouse/departments/process';
import {
  type GreenhouseProcedure,
  greenhouseProcedure,
} from '@/server/api/trpc';

type Params = Pick<Parameters<typeof syncDepartments>[0], 'recruiter_id'>;

const schema = z.object({
  job_id: z.string().uuid(),
  recruiter_id: z.string().uuid(),
}) satisfies ZodTypeToSchema<Params>;

const mutation = async ({ ctx, input }: GreenhouseProcedure<typeof schema>) => {
  return await syncDepartments({
    decryptKey: ctx.decryptKey,
    recruiter_id: input.recruiter_id,
    supabaseAdmin: ctx.adminDb,
  });
};

export const departments = greenhouseProcedure.input(schema).mutation(mutation);
