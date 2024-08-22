import { DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { JobCreate } from '@/src/queries/jobs/types';
import { CustomType } from '@/src/queries/scheduling-dashboard/types';
import { interviewPlanRecruiterUserQuery } from '@/src/utils/Constants';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { job_id } = req.query as {
      // eslint-disable-next-line no-unused-vars
      [id in keyof GetInterviewPlansType['request']]: string;
    };
    if (job_id) {
      const resInterviewPlan = await getInterviewPlans({ job_id });
      return res.status(200).send(resInterviewPlan);
    } else {
      return res.status(400).send('Invalid query params');
    }
  }
  res.setHeader('Allow', 'GET');
  res.status(405).end('Method Not Allowed!');
};

export default handler;

type Response = Awaited<ReturnType<typeof getInterviewPlans>>;
export type GetInterviewPlansType = {
  request: Parameters<typeof getInterviewPlans>[0];
  respone: CustomType<
    Response,
    {
      interview_session: CustomType<
        Response[number]['interview_session'],
        {
          members_meta: {
            // eslint-disable-next-line no-unused-vars
            [id in
              | keyof Pick<
                  JobCreate,
                  | 'hiring_manager'
                  | 'recruiting_coordinator'
                  | 'recruiter'
                  | 'sourcer'
                >
              | 'previous_interviewers']: boolean;
          };
        }
      >;
    }
  >;
};

const getInterviewPlans = async ({ job_id }: { job_id: string }) => {
  const response = (
    await supabase
      .from('interview_plan')
      .select(
        `*, interview_session(*, interview_module(*), interview_session_relation(*, recruiter_user(${interviewPlanRecruiterUserQuery}), interview_module_relation(id, training_status, pause_json, recruiter_user(${interviewPlanRecruiterUserQuery}))))`,
      )
      .eq('job_id', job_id)
      .order('plan_order', { ascending: true })
      .throwOnError()
  ).data;
  if (response?.length) {
    response.map((item) => {
      if (item?.interview_session)
        item.interview_session.sort(
          (a, b) => a.session_order - b.session_order,
        );
    });
  }

  return response;
};
