import { z } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const candidatePortalSchema = z.object({
  banner_image: z.optional(z.string().nullable()),
  company_images: z.optional(z.array(z.string())),
  about: z.optional(z.string()),
  greetings: z.optional(z.string()),
});

const mutation = async ({
  input,
  ctx: { recruiter_id },
}: PrivateProcedure<typeof candidatePortalSchema>) => {
  const db = createPrivateClient();

  await db
    .from('recruiter_preferences')
    .update({ ...input })
    .eq('recruiter_id', recruiter_id);
};

export const updateCandidatePortal = privateProcedure
  .input(candidatePortalSchema)
  .mutation(mutation);
