import { TRPCError } from '@trpc/server';

import { createPrivateClient } from '@/server/db';

import { type PrivateProcedure, privateProcedure } from '../../trpc';
import { withBanners } from './common/withBanners';

const query = async ({ ctx }: PrivateProcedure) => {
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
  return jobs.map((job) => withBanners(job));
};

export const read = privateProcedure.query(query);
