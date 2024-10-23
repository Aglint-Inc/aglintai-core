import { createPrivateClient } from '@/server/db';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '../../trpc';

const query = async ({ ctx: { recruiter_id } }: PrivateProcedure) => {
  const db = await createPrivateClient();
  return (
    await db
      .from('departments')
      .select()
      .eq('recruiter_id', recruiter_id)
      .throwOnError()
  ).data;
};

export const allDepartments = privateProcedure.query(query);

export type AllDepartments = ProcedureDefinition<typeof allDepartments>;
