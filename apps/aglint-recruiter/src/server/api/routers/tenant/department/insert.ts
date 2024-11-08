import { z } from 'zod';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '../../../trpc';

const schema = z.object({ name: z.string() });
const mutation = async ({ input, ctx }: PrivateProcedure<typeof schema>) => {
  const db = ctx.db;
  await db
    .from('departments')
    .insert({ name: input.name, recruiter_id: ctx.recruiter_id })
    .throwOnError();
};

export const insertDepartment = privateProcedure
  .input(schema)
  .mutation(mutation);

export type InsertDepartments = ProcedureDefinition<typeof insertDepartment>;
