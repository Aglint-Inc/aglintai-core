import { TRPCError } from '@trpc/server';

import { createPrivateClient } from '@/server/db';

import { type PrivateProcedure, privateProcedure } from '../../trpc';
import { getBanners } from './common/getBanners';
import type { Read } from './job/read';

const query = async ({ ctx }: PrivateProcedure): Promise<Read[]> => {
  const db = createPrivateClient();
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
