import { jobViewRowSchema } from '@aglint/shared-types';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';

import { getBanners } from './common/getBanners';

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

const output = z.array(jobViewRowSchema.merge(z.object({ banner: z.any() })));

export const read = privateProcedure.output(output).query(query);

export type Read = ProcedureDefinition<typeof read>;
