import { z } from 'zod';

import { type ATSProcedure, atsProcedure } from '@/server/api/trpc';

import { greenhouseJobsMutation } from '../greenhouse/jobs';
import { leverJobsMutation } from '../lever/jobs';

const schema = z.object({
  recruiter_id: z.string().uuid(),
});

export const mutation = async (payload: ATSProcedure<typeof schema>) => {
  switch (payload.ctx.ats) {
    case 'Greenhouse':
      return await greenhouseJobsMutation(payload);
    case 'Lever':
      return await leverJobsMutation(payload);
    case 'Ashby':
      return;
  }
};

export const jobs = atsProcedure.input(schema).mutation(mutation);
