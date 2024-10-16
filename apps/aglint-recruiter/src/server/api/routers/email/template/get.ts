import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

const query = async ({ ctx: { recruiter_id } }: PrivateProcedure) => {
  const supabase = createPublicClient();
  return (
    await supabase
      .from('company_email_template')
      .select('*')
      .eq('recruiter_id', recruiter_id)
      .throwOnError()
  ).data;
};

export const get = privateProcedure.query(query);

export type Get = ProcedureDefinition<typeof get>;
