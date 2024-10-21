import { z } from 'zod';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

const updateProfileSchema = z.object({
  greetings: z.string().optional().nullable(),
  about: z.string().optional().nullable(),
});
const mutate = async ({
  input,
  ctx: { recruiter_id },
}: PrivateProcedure<typeof updateProfileSchema>) => {
  const { ...payload } = input;

  const db = createPublicClient();

  await db
    .from('recruiter_preferences')
    .update({ ...payload })
    .eq('recruiter_id', recruiter_id)
    .throwOnError();
};

export const update_portal_detail = privateProcedure
  .input(updateProfileSchema)
  .mutation(mutate);

export type updatePortalDetail = ProcedureDefinition<
  typeof update_portal_detail
>;
