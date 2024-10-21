import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

import { getBanners } from '../common/getBanners';

const schema = z.object({
  id: z.string().uuid(),
});

const query = async ({ ctx, input }: PrivateProcedure<typeof schema>) => {
  const db = createPrivateClient();
  const job = (
    await db
      .from('job_view')
      .select()
      .eq('recruiter_id', ctx.recruiter_id)
      .eq('id', input.id)
      .single()
      .throwOnError()
  ).data;
  if (!job)
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Job not found',
    });
  const banner = getBanners(job);
  return {
    ...job,
    banner,
  };
};

export const read = privateProcedure.input(schema).query(query);

export type Read = ProcedureDefinition<typeof read>;
