import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';

const query = async ({ ctx }: PrivateProcedure) => {
  const db = ctx.db;
  const interview_types = (
    await db
      .from('interview_types_view')
      .select('*')
      .eq('recruiter_id', ctx.recruiter_id)
      .throwOnError()
  ).data;

  return interview_types ?? [];
};

export const interviewPools = privateProcedure.query(query);

export type InterviewPools = ProcedureDefinition<typeof interviewPools>;
