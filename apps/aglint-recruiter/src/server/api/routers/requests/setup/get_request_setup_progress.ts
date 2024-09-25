import { z } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

export const getRequestSetupProgressSchema = z.object({
  recruiter_id: z.string().uuid(),
});
const query = async ({
  input: { recruiter_id },
}: PrivateProcedure<typeof getRequestSetupProgressSchema>) => {
  const db = createPrivateClient();

  const recruiter = (
    await db
      .from('recruiter')
      .select(
        'public_jobs(*),interview_plan(*),candidates(*),interview_module(*)',
      )
      .eq('id', recruiter_id)
      .single()
      .throwOnError()
  ).data;

  const jobs = recruiter?.public_jobs.length > 0;
  const interview_module = recruiter?.interview_module.length > 0;
  const candidates = recruiter?.candidates.length > 0;
  const interview_plan = recruiter?.interview_plan.length > 0;
  return {
    jobs: jobs ? true : false,
    intervieModules: interview_module ? true : false,
    candidates: candidates ? true : false,
    interviewPlan: interview_plan ? true : false,
    isSetupCompleted: jobs && interview_module && candidates && interview_plan,
  };
};

export const getRequestSetupProgress = privateProcedure
  .input(getRequestSetupProgressSchema)
  .query(query);
