import { z } from 'zod';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '../../../trpc';

const schema = z.object({ department_id: z.number() });
const mutation = async ({ input, ctx }: PrivateProcedure<typeof schema>) => {
  const db = ctx.db;
  await db
    .from('departments')
    .delete()
    .eq('id', input.department_id as number)
    .eq('recruiter_id', ctx.recruiter_id)
    .throwOnError();
};

export const deleteDepartment = privateProcedure
  .input(schema)
  .mutation(mutation);

export type DeleteDepartments = ProcedureDefinition<typeof deleteDepartment>;
