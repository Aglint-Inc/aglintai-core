import type { DatabaseTableInsert } from '@aglint/shared-types';
import { TRPCError } from '@trpc/server';
import { z, type ZodSchema } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

import { safeGenerateJd } from '../common/generateJd';
import { jobDescriptionSchema } from '../common/schema';

const schema = z.object({
  hiring_manager: z.string().uuid(),
  recruiter: z.string().uuid(),
  recruiting_coordinator: z.string().uuid().nullish(),
  sourcer: z.string().uuid().nullish(),
  description: jobDescriptionSchema,
  job_title: z.string(),
  job_type: z
    .enum([
      'contract',
      'full time',
      'part time',
      'temporary',
      'volunteer',
      'internship',
    ])
    .nullish(),
  workplace_type: z.enum(['hybrid', 'on site', 'off site']).nullish(),
  department_id: z.number().nullish(),
  location_id: z.number().nullish(),
}) satisfies ZodSchema<
  Pick<
    DatabaseTableInsert['public_jobs'],
    | 'id'
    | 'hiring_manager'
    | 'recruiter'
    | 'recruiting_coordinator'
    | 'sourcer'
    | 'description'
    | 'job_title'
    | 'job_type'
    | 'workplace_type'
    | 'department_id'
    | 'location_id'
  >
>;

const mutation = async ({
  ctx,
  input,
}: PrivateProcedure<typeof schema>): Promise<Aglint['output']> => {
  const db = createPrivateClient();
  const job = (
    await db
      .from('public_jobs')
      .insert({ recruiter_id: ctx.recruiter_id, ...input })
      .select('id')
      .single()
      .throwOnError()
  ).data;
  if (!job)
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Unable to create job',
    });
  await safeGenerateJd({ ctx, input: { id: job.id, type: 'generate' } });
  return job.id;
};

export const aglint = privateProcedure.input(schema).mutation(mutation);

export type Aglint = {
  input: z.infer<typeof schema>;
  output: string;
};
