import { z } from 'zod';

import { type ATSProcedure, atsProcedure } from '@/server/api/trpc';

import { greenhouseJobMutation } from '../greenhouse/applications';
import { leverJobmutation } from '../lever/job';

const schema = z.object({
  recruiter_id: z.string().uuid(),
  job_id: z.string().uuid(),
});

export const mutation = async (payload: ATSProcedure<typeof schema>) => {
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
