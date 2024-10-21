import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createPrivateClient } from '@/server/db';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '../../trpc';

const schema = z.object({
  id: z.number(),
});

const query = async ({ ctx, input }: PrivateProcedure<typeof schema>) => {
  const db = createPrivateClient();
  const temp_user = (
    await db
      .from('departments')
      .select('name, recruiter_user(first_name,last_name)')
      .eq('id', input.id)
      .eq('recruiter_id', ctx.recruiter_id)
      .single()
      .throwOnError()
  ).data!;

  if (!temp_user)
    throw new TRPCError({
      code: 'UNPROCESSABLE_CONTENT',
      message: 'Departments not found',
    });

  const jobs = (
    await db
      .from('public_jobs')
      .select('job_title,departments!inner(name)')
      .eq('departments.name', temp_user.name)
      .throwOnError()
  ).data!;

  const jobUsage = (jobs ?? []).map((job) => job.job_title);
  const userUsage = temp_user.recruiter_user;

  return { name: temp_user.name, jobUsage, userUsage };
};

export const departmentsUsage = privateProcedure.input(schema).query(query);

export type DepartmentsUsage = ProcedureDefinition<typeof departmentsUsage>;
