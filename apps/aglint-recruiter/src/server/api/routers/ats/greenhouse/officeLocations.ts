import type { ZodTypeToSchema } from '@aglint/shared-types';
import { z } from 'zod';

import { syncOfficeLocations } from '@/api/sync/greenhouse/office_locations/process';
import {
  type GreenhouseProcedure,
  greenhouseProcedure,
} from '@/server/api/trpc';

type Params = Pick<Parameters<typeof syncOfficeLocations>[0], 'recruiter_id'>;

const schema = z.object({
  recruiter_id: z.string().uuid(),
}) satisfies ZodTypeToSchema<Params>;

const mutation = async ({ ctx, input }: GreenhouseProcedure<typeof schema>) => {
  return await syncOfficeLocations({
    decryptKey: ctx.decryptKey,
    recruiter_id: input.recruiter_id,
    supabaseAdmin: ctx.adminDb,
  });
};

export const officeLocations = greenhouseProcedure
  .input(schema)
  .mutation(mutation);
