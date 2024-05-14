import { Database } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { interviewPlanRecruiterUserQuery } from '@/src/utils/Constants';

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

interface BodyParamsFetchUserDetails {
  recruiter_id: string;
  status?: 'joined' | 'invited';
}

export type CompanyMembersAPI = ReturnType<typeof fetchUsers>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { recruiter_id, status = 'joined' } =
      req.body as BodyParamsFetchUserDetails;

    const resUsers = await fetchUsers(recruiter_id, status);
    if (resUsers.length) {
      return res.status(200).json(resUsers);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export default handler;

const fetchUsers = async (recruiter_id: string, status: string) => {
  return supabase
    .from('recruiter_relation')
    .select(
      `role,recruiter_user!public_recruiter_relation_user_id_fkey(${interviewPlanRecruiterUserQuery})`,
    )
    .eq('recruiter_id', recruiter_id)
    .eq('recruiter_user.join_status', status)
    .then(({ data, error }) => {
      if (error) throw new Error(error.message);
      return data
        .filter((item) => item.recruiter_user)
        .map((item) => ({ ...item.recruiter_user, role: item.role }));
    });
};
