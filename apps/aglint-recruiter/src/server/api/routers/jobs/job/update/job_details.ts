import type { DatabaseTableUpdate } from '@aglint/shared-types';
import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import { z } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

import { jobDescriptionSchema } from '../../common/schema';

const schema = z.object({
  id: z.string().uuid(),
  job_title: z.string().optional(),
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
  description: jobDescriptionSchema,
}) satisfies z.ZodSchema<
  Pick<
    DatabaseTableUpdate['public_jobs'],
    | 'id'
    | 'job_title'
    | 'job_type'
    | 'workplace_type'
    | 'department_id'
    | 'location_id'
    | 'description'
  >
>;

const mutation = async ({
  input: { id, ...payload },
  ctx,
}: PrivateProcedure<typeof schema>): Promise<JobDetails['output']> => {
  const db = createPrivateClient();
  return await db
    .from('public_jobs')
    .update(payload)
    .eq('id', id)
    .eq('recruiter_id', ctx.recruiter_id)
    .throwOnError();
};

export const job_details = privateProcedure.input(schema).mutation(mutation);

export type JobDetails = {
  input: z.infer<typeof schema>;
  output: PostgrestSingleResponse<null>;
};
