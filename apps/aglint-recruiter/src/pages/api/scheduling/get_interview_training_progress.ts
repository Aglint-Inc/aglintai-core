import { type DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { type SchedulingDashboardTypes } from '@/src/queries/scheduling-dashboard/types';
import { interviewPlanRecruiterUserQuery } from '@/src/utils/Constants';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export type ApiResponseInterviewTrainingProgress = Awaited<
  ReturnType<typeof getInterviewTrainingProgress>
>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const { recruiter_id } = req.query as {
      // eslint-disable-next-line no-unused-vars
      [id in keyof Parameters<getInterviewTrainingProgressType>[0]]: string;
    };
    if (recruiter_id) {
      const resInterviewTrainingProgress = await getInterviewTrainingProgress({
        recruiter_id,
      });

      return res.send(resInterviewTrainingProgress);
    } else {
      return res.send([]); // do error handling
    }
  }
  res.setHeader('Allow', 'GET');
  res.status(405).end('Method Not Allowed!');
}

export type getInterviewTrainingProgressType =
  typeof getInterviewTrainingProgress;

const getInterviewTrainingProgress = async ({
  recruiter_id,
}: {
  recruiter_id: string;
}) => {
  const { data, error } = await supabase
    .from('interview_module')
    .select(
      `id, name, settings, interview_module_relation(recruiter_user(${interviewPlanRecruiterUserQuery}), interview_session_relation(training_type,interview_session(interview_meeting(status))))`,
    )
    .eq('recruiter_id', recruiter_id)
    .not('settings', 'is', null)
    .eq('interview_module_relation.training_status', 'training')
    .eq(
      'interview_module_relation.interview_session_relation.is_confirmed',
      true,
    )
    .in('interview_module_relation.interview_session_relation.training_type', [
      'shadow',
      'reverse_shadow',
    ] as (keyof SchedulingDashboardTypes['interviewTrainingProgress'][number]['count'])[])
    .eq(
      'interview_module_relation.interview_session_relation.interview_session.interview_meeting.status',
      'completed',
    );
  if (error) throw new Error(error.message);

  return data
    .reduce(
      (acc, { interview_module_relation, id, name, settings }) => {
        if (settings && interview_module_relation.length)
          acc.push(
            ...interview_module_relation.reduce(
              (acc, { interview_session_relation, recruiter_user }) => {
                const entry: SchedulingDashboardTypes['interviewTrainingProgress'][number] =
                  {
                    recruiter_user,
                    module: {
                      id,
                      name,
                      settings:
                        settings as SchedulingDashboardTypes['interviewTrainingProgress'][number]['module']['settings'],
                    },
                    count: { reverse_shadow: 0, shadow: 0 },
                  };
                if (interview_session_relation.length)
                  interview_session_relation.forEach((curr) => {
                    if (curr.interview_session.interview_meeting)
                      entry.count[curr.training_type] += 1;
                  });
                acc.push(entry);
                return acc;
              },
              [] as SchedulingDashboardTypes['interviewTrainingProgress'],
            ),
          );
        return acc;
      },
      [] as SchedulingDashboardTypes['interviewTrainingProgress'],
    )
    .sort((a, z) => sortHelper(z) - sortHelper(a));
};

const sortHelper = ({
  count,
}: SchedulingDashboardTypes['interviewTrainingProgress'][number]) => {
  return Object.values(count).reduce((acc, curr) => {
    acc += curr;
    return acc;
  }, 0);
};
