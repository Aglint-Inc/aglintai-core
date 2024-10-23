import { TRPCError } from '@trpc/server';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

import { getBanners } from './common/getBanners';

const query = async ({ ctx }: PrivateProcedure) => {
  const db = await createPrivateClient();
  const jobs = (
    await db
      .from('job_view')
      .select()
      .eq('recruiter_id', ctx.recruiter_id)
      .throwOnError()
  ).data;
  if (!jobs)
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Jobs not found',
    });
  return jobs.map((job) => ({ ...job, banner: getBanners(job) }));
};

export const read = privateProcedure.query(query);

export type Read = ProcedureDefinition<typeof read>;
