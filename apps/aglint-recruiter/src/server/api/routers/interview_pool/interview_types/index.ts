import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const query = async ({ ctx: { recruiter_id } }: PrivateProcedure) => {
  const db = createPrivateClient();
  const interview_types = (
    await db
      .from('interview_types_view')
      .select('*')
      .eq('recruiter_id', recruiter_id)
      .throwOnError()
  ).data;

  return interview_types ?? [];
};

export const interviewPools = privateProcedure.query(query);

export type InterviewPools = ProcedureDefinition<typeof interviewPools>;
