import { z } from 'zod';

import { type ATSProcedure, atsProcedure } from '@/server/api/trpc';

const schema = z.object({
  recruiter_id: z.string().uuid(),
});

export const leverJobsMutation = async ({
  input,
  ctx,
}: ATSProcedure<typeof schema>) => {
  const jobs = (
    await ctx.adminDb
      .from('public_jobs')
      .select('id')
      .eq('recruiter_id', input.recruiter_id)
      .eq('posted_by', 'Lever')
      .throwOnError()
  ).data.map(({ id }) => id);
  const promises = jobs.map((job_id) =>
    fetch(`${process.env.NEXT_PUBLIC_HOST_NAME}/api/lever/candidateSync`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ job_id }),
    }),
  );
  Promise.all(promises);
  return;
};

export const jobs = atsProcedure.input(schema).mutation(leverJobsMutation);
