import { departmentsUpdateSchema } from '@aglint/shared-types';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '../../../trpc';

const mutation = async ({
  input,
  ctx,
}: PrivateProcedure<typeof departmentsUpdateSchema>) => {
  const db = ctx.db;
  await db
    .from('departments')
    .delete()
    .eq('id', input.id as number)
    .eq('recruiter_id', ctx.recruiter_id)
    .throwOnError();
};

export const deleteDepartment = privateProcedure
  .input(departmentsUpdateSchema)
  .mutation(mutation);

export type DeleteDepartments = ProcedureDefinition<typeof deleteDepartment>;
