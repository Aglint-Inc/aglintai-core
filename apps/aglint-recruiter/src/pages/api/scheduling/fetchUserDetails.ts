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
  includeSupended?: boolean;
}

export type CompanyMembersAPI = ReturnType<typeof fetchUsers>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { recruiter_id, includeSupended } =
      req.body as BodyParamsFetchUserDetails;

    const resUsers = await fetchUsers(recruiter_id, includeSupended);
    if (resUsers.length) {
      return res.status(200).json(resUsers);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export default handler;

const fetchUsers = async (recruiter_id: string, includeSupended: boolean) => {
  const filSup = supabase
    .from('recruiter_relation')
    .select(
      `recruiter_user!public_recruiter_relation_user_id_fkey(${interviewPlanRecruiterUserQuery}), roles(name)`,
    )
    .eq('recruiter_id', recruiter_id);

  return filSup.then(({ data, error }) => {
    if (error) throw new Error(error.message);
    const resAlter = data
      .filter((item) => item.recruiter_user)
      .map((item) => ({
        ...item.recruiter_user,
        role: item.roles.name as (typeof defaultRoles)[number]['name'],
      }));

    if (includeSupended) return resAlter;

    return resAlter.filter((item) => item.status === 'active');
  });
};
