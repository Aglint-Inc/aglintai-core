import { jobViewRowSchema } from '@aglint/shared-types';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';

import { bannerSchema, getBanners } from './common/getBanners';

const query = async ({ ctx }: PrivateProcedure) => {
  const db = ctx.db;
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

type Output = Awaited<ReturnType<typeof query>>;

const output = z.array(
  jobViewRowSchema.merge(z.object({ banner: bannerSchema })),
);

export const read = privateProcedure.output(output).query(query);

export type Read = Pick<ProcedureDefinition<typeof read>, 'input'> & {
  output: Output;
};
