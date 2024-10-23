import { z } from 'zod';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const schema = z.object({
  isTraining: z.boolean(),
  name: z.string(),
  description: z.string(),
});

const mutation = async ({
  input,
  ctx: { recruiter_id },
}: PrivateProcedure<typeof schema>) => {
  const db = await createPrivateClient();

  const payload = {
    name: input.name,
    description: input.description,
    recruiter_id,
    settings: {
      require_training: input.isTraining,
      noShadow: 2,
      noReverseShadow: 2,
      reqruire_approval: false,
    },
  };

  return (
    await db
      .from('interview_module')
      .insert(payload)
      .select('id')
      .single()
      .throwOnError()
  ).data;
};

export const createInterviewPool = privateProcedure
  .input(schema)
  .mutation(mutation);

export type CreateInterviewPool = ProcedureDefinition<
  typeof createInterviewPool
>;
