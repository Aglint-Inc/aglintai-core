import { interviewPlanRecruiterUserQuery } from '@/constant/interviewPlanRecruiterUserQuery';
import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

const query = async ({ ctx: { recruiter_id } }: PrivateProcedure) => {
  return await getInterviewModules({ recruiter_id });
};

export const getAllInterviewPool = privateProcedure.query(query);

export type GetAllInterviewPool = ProcedureDefinition<
  typeof getAllInterviewPool
>;

const getInterviewModules = async ({
  recruiter_id,
}: {
  recruiter_id: string;
}) => {
  const db = createPublicClient();
  const { data, error } = await db
    .from('interview_module')
    .select(
      `*, interview_module_relation(id, training_status, is_archived, pause_json, recruiter_user(${interviewPlanRecruiterUserQuery}))`,
    )
    .eq('is_archived', false)
    .eq('recruiter_id', recruiter_id);
  if (error) throw new Error(error.message);
  return data.map(({ interview_module_relation, ...rest }) => {
    const members = interview_module_relation
      .filter((rel) => !rel.is_archived)
      .map(({ recruiter_user, id, training_status, pause_json }) => ({
        ...recruiter_user,
        module_relation_id: id,
        training_status,
        paused: !!pause_json,
      }));
    return { ...rest, members };
  });
};
