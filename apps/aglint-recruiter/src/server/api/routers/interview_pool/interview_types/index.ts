import { z } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';

export const interviewPoolModuleSchema = z.object({
  recruiter_id: z.string().uuid(),
});

const query = async ({
  ctx: { db },
  input: { recruiter_id },
}: PrivateProcedure<typeof interviewPoolModuleSchema>) => {
  const response = (
    await db
      .from('interview_types_view')
      .select('*')
      .eq('recruiter_id', recruiter_id)
      .throwOnError()
  ).data;

  return response;
};

export const interviewPools = privateProcedure
  .input(interviewPoolModuleSchema)
  .query(query);
