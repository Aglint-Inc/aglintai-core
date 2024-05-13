import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { CustomDatabase } from '@/src/types/customSchema';
import { interviewPlanRecruiterUserQuery } from '@/src/utils/Constants';

const supabase = createClient<CustomDatabase>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { job_id } = req.query as {
      // eslint-disable-next-line no-unused-vars
      [id in keyof Parameters<getInterviewPlansType>[0]]: string;
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

export type getInterviewPlansType = typeof getInterviewPlans;

const getInterviewPlans = async ({ job_id }: { job_id: string }) => {
  const { data, error } = await supabase
    .from('interview_plan')
    .select(
      `*, interview_session(*, interview_module(*), interview_session_relation(*, recruiter_user(${interviewPlanRecruiterUserQuery}), interview_module_relation(id, training_status, recruiter_user(${interviewPlanRecruiterUserQuery}))))`,
    )
    .eq('job_id', job_id);
  if (error) throw new Error(error.message);
  if (data.length === 0) return null;
  const response = data[0];
  if (response?.interview_session)
    response.interview_session.sort(
      (a, b) => a.session_order - b.session_order,
    );
  return response;
};
