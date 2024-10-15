import { z } from 'zod';

import {
  type ATSProcedure,
  atsProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';

const schema = z.object({
  recruiter_id: z.string().uuid(),
  job_id: z.string().uuid(),
});

export const leverJobmutation = ({ input }: ATSProcedure<typeof schema>) => {
  fetch(`${process.env.NEXT_PUBLIC_HOST_NAME}/api/lever/candidateSync`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ job_id: input.job_id }),
  });
  return;
};

export const job = atsProcedure.input(schema).mutation(leverJobmutation);

export type Job = ProcedureDefinition<typeof job>;
