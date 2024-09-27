import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { type ATSProcedure, atsProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

import { greenhouseJobMutation } from '../greenhouse/applications';
import { leverJobmutation } from '../lever/job';

const schema = z.object({
  recruiter_id: z.string().uuid(),
  job_id: z.string().uuid(),
});

export const mutation = async (payload: ATSProcedure<typeof schema>) => {
  const db = createPublicClient();
  const { syncable } = (
    await db
      .from('job_view')
      .select('syncable')
      .eq('job_id', payload.input.job_id)
      .single()
      .throwOnError()
  ).data!;
  if (!syncable)
    throw new TRPCError({
      code: 'UNPROCESSABLE_CONTENT',
      message: 'Job cannot be synced',
    });
  switch (payload.ctx.ats) {
    case 'Greenhouse':
      return await greenhouseJobMutation(payload);
    case 'Lever':
      return await leverJobmutation(payload);
    case 'Ashby':
      return;
  }
};

export const job = atsProcedure.input(schema).mutation(leverJobmutation);
