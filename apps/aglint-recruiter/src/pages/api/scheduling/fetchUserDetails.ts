import { DB } from '@aglint/shared-types';
import { defaultRoles } from '@aglint/shared-utils';
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { interviewPlanRecruiterUserQuery } from '@/src/utils/Constants';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export interface BodyParamsFetchUserDetails {
  recruiter_id: string;
  status?: 'joined' | 'invited';
  is_suspended?: boolean | null;
}

export type CompanyMembersAPI = ReturnType<typeof fetchUsers>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      recruiter_id,
      status = 'joined',
      is_suspended,
    } = req.body as BodyParamsFetchUserDetails;

    const resUsers = await fetchUsers(recruiter_id, status, is_suspended);
    if (resUsers.length) {
      return res.status(200).json(resUsers);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export default handler;

const fetchUsers = async (
  recruiter_id: string,
  status: string,
  is_suspended: boolean,
) => {
  const filSup = supabase
    .from('recruiter_relation')
    .select(
      `recruiter_user!public_recruiter_relation_user_id_fkey(${interviewPlanRecruiterUserQuery}), roles(name)`,
    )
    .eq('recruiter_id', recruiter_id);

  if (is_suspended) {
    filSup.eq('recruiter_user.is_suspended', is_suspended);
  }

  return filSup
    .eq('recruiter_user.join_status', status)
    .then(({ data, error }) => {
      if (error) throw new Error(error.message);
      return data
        .filter((item) => item.recruiter_user)
        .map((item) => ({
          ...item.recruiter_user,
          role: item.roles.name as (typeof defaultRoles)[number]['name'],
        }));
    });
};
