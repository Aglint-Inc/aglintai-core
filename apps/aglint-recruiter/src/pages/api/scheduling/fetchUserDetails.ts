import { DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { interviewPlanRecruiterUserQuery } from '@/src/utils/Constants';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export type ApiFetchUserDetails = Awaited<ReturnType<typeof fetchUsers>>;

export interface BodyParamsFetchUserDetails {
  recruiter_id: string;
  includeSupended?: boolean;
  isCalendar?: boolean | null;
}

export type CompanyMembersAPI = Awaited<ReturnType<typeof fetchUsers>>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      recruiter_id,
      includeSupended,
      isCalendar = null,
    } = req.body as BodyParamsFetchUserDetails;

    const resUsers = await fetchUsers(
      recruiter_id,
      includeSupended,
      isCalendar,
    );
    return res.status(200).json(resUsers);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export default handler;

const fetchUsers = async (
  recruiter_id: string,
  includeSuspended: boolean,
  isCalendarConnected: boolean | null,
) => {
  const query = supabase
    .from('recruiter_relation')
    .select(
      `recruiter_user!public_recruiter_relation_user_id_fkey(${interviewPlanRecruiterUserQuery}, office_locations(*), departments(id,name)), roles(name)`,
    )
    .eq('recruiter_id', recruiter_id)
    .eq('is_active', true);

  if (includeSuspended) {
    query.in('recruiter_user.status', ['active', 'suspended']);
  } else {
    query.in('recruiter_user.status', ['active']);
  }

  if (isCalendarConnected) {
    query.eq('recruiter_user.is_calendar_connected', true);
  }

  return query.throwOnError().then(({ data, error }) => {
    if (error) throw new Error(error.message);
    const resAlter = data
      .filter((item) => Boolean(item.recruiter_user))
      .map((item) => ({
        ...item.recruiter_user,
        role: item.roles.name,
      }));

    return resAlter;
  });
};
