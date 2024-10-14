import type { DatabaseView } from '@aglint/shared-types';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createPrivateClient } from '@/server/db';

import { type PrivateProcedure, privateProcedure } from '../../../trpc';
import { type Banner, getBanners } from '../common/getBanners';

const schema = z.object({
  id: z.string().uuid(),
});

const query = async ({
  ctx,
  input,
}: PrivateProcedure<typeof schema>): Promise<Read['output']> => {
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

type Meta = {
  banner: Banner;
};

export type Read = {
  input: z.infer<typeof schema>;
  output: DatabaseView['job_view'] & Meta;
};
