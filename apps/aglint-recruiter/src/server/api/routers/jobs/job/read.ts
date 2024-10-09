import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createPrivateClient } from '@/server/db';

import { type PrivateProcedure, privateProcedure } from '../../../trpc';
import { withBanners } from '../common/withBanners';

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
      code: 'FORBIDDEN',
      message: 'Job not found',
    });
  return withBanners(job);
};

export const read = privateProcedure.input(schema).query(query);

export type Read = Awaited<ReturnType<typeof query>>;
