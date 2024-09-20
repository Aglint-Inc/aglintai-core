import type { ZodTypeToSchema } from '@aglint/shared-types';
import { z } from 'zod';

import { syncOfficeLocations } from '@/api/sync/greenhouse/office_locations/process';
import { type ATSProcedure, atsProcedure } from '@/server/api/trpc';

type Params = Pick<Parameters<typeof syncOfficeLocations>[0], 'recruiter_id'>;

const schema = z.object({
  recruiter_id: z.string().uuid(),
}) satisfies ZodTypeToSchema<Params>;

const mutation = async ({ ctx, input }: ATSProcedure<typeof schema>) => {
  return await syncOfficeLocations({
    decryptKey: ctx.decryptKey,
    recruiter_id: input.recruiter_id,
    supabaseAdmin: ctx.adminDb,
  });
};

export const officeLocations = atsProcedure.input(schema).mutation(mutation);
