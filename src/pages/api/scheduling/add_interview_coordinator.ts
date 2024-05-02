import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { CustomDatabase } from '@/src/types/customSchema';
import { interviewPlanRecruiterUserQuery } from '@/src/utils/Constants';

const supabase = createClient<CustomDatabase>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PATCH') {
    const { coordinator, plan_id } = req.body as {
      // eslint-disable-next-line no-unused-vars
      [id in keyof Parameters<addInterviewCoordinatorType>[0]]: string;
    };
    if (coordinator && plan_id) {
      const resAddInterviewCoordinator = await addInterviewCoordinator({
        coordinator,
        plan_id,
      });
      return res.status(200).send(resAddInterviewCoordinator);
    } else {
      return res.status(400).send('Invalid request body');
    }
  }
  res.setHeader('Allow', 'PATCH');
  res.status(405).end('Method Not Allowed!');
};

export default handler;

export type addInterviewCoordinatorType = typeof addInterviewCoordinator;

const addInterviewCoordinator = async ({ coordinator, plan_id }) => {
  const { data, error } = await supabase
    .from('interview_plan')
    .update({ coordinator_id: coordinator.user_id })
    .eq('id', plan_id)
    .select(`recruiter_user(${interviewPlanRecruiterUserQuery})`);
  if (error) throw new Error(error.message);
  return data[0]['recruiter_user'];
};
