import { z } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

import { jobDescriptionSchema } from '../common/jobDescriptionSchema';

const schema = z.object({
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
    .optional(),
  workplace_type: z.enum(['hybrid', 'on site', 'off site']).optional(),
  department_id: z.number().optional(),
  location_id: z.number().optional(),
  description: jobDescriptionSchema,
  hiring_manager: z.string().uuid(),
  recruiter: z.string().uuid(),
  recruiting_coordinator: z.string().uuid().optional(),
  sourcer: z.string().uuid().optional(),
});

const mutation = async ({ ctx, input }: PrivateProcedure<typeof schema>) => {
  const db = createPrivateClient();
  return (
    await db
      .from('public_jobs')
      .insert({ recruiter_id: ctx.recruiter_id, ...input })
      .select('id')
      .single()
      .throwOnError()
  ).data;
};

export const aglint = privateProcedure.input(schema).mutation(mutation);
