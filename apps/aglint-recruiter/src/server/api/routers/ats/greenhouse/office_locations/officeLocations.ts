import type { ZodTypeToSchema } from '@aglint/shared-types';
import { z } from 'zod';

import {
  type ATSProcedure,
  atsProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

import { syncOfficeLocations } from './process';

type Params = Pick<Parameters<typeof syncOfficeLocations>[0], 'recruiter_id'>;

const schema = z.object({
  recruiter_id: z.string().uuid(),
}) satisfies ZodTypeToSchema<Params>;

const mutation = async ({ ctx, input }: ATSProcedure<typeof schema>) => {
  const adminDb = createPublicClient();
  return await syncOfficeLocations({
    decryptKey: ctx.decryptKey,
    recruiter_id: input.recruiter_id,
    supabaseAdmin: adminDb,
  });
};

export const officeLocations = atsProcedure.input(schema).mutation(mutation);

export type OfficeLocations = ProcedureDefinition<typeof officeLocations>;
