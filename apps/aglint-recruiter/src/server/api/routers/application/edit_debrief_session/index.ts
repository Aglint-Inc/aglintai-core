import {
  interviewSessionRowSchema,
  type ZodTypeToSchema,
} from '@aglint/shared-types';
import { type CustomMembersMeta } from '@aglint/shared-types/src/db/common.types';
import { z } from 'zod';

import { updateDebriefSession } from '@/queries/interview-plans/utils';
import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';

const schema = interviewSessionRowSchema
  .pick({
    break_duration: true,
    name: true,
    schedule_type: true,
    session_duration: true,
  })
  .extend({
    session_id: z.string(),
    location: z.string(),
    members: z.array(z.object({ id: z.string() })),
    members_meta: z.object({
      recruiter: z.boolean(),
      hiring_manager: z.boolean(),
      recruiting_coordinator: z.boolean(),
      sourcer: z.boolean(),
      previous_interviewers: z.boolean(),
    }) satisfies ZodTypeToSchema<CustomMembersMeta>,
  });

const mutation = async ({
  input,
  ctx: { db },
}: PrivateProcedure<typeof schema>) => {
  await updateDebriefSession(input, db);
  return true;
};

export const editDebriefSession = privateProcedure
  .input(schema)
  .mutation(mutation);
