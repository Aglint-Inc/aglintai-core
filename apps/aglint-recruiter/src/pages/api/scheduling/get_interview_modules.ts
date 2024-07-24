import { DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { interviewPlanRecruiterUserQuery } from '@/src/utils/Constants';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { recruiter_id } = req.query as {
      // eslint-disable-next-line no-unused-vars
      [id in keyof Parameters<getInterviewModulesType>[0]]: string;
    };
    if (recruiter_id) {
      const resInterviewModules = await getInterviewModules({ recruiter_id });
      return res.status(200).send(resInterviewModules);
    } else {
      return res.status(400).send('Invalid query params');
    }
  }
  res.setHeader('Allow', 'GET');
  res.status(405).end('Method Not Allowed!');
};

export default handler;

export type getInterviewModulesType = typeof getInterviewModules;

const getInterviewModules = async ({
  recruiter_id,
}: {
  recruiter_id: string;
}) => {
  const { data, error } = await supabase
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
        moduleUserId: id,
        training_status,
        paused: !!pause_json,
      }));
    return { ...rest, members };
  });
};
