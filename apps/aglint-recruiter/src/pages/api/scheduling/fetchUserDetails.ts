import { type DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { interviewPlanRecruiterUserQuery } from '@/utils/Constants';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
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
      includeSupended = false,
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

export const fetchUsers = async (
  recruiter_id: string,
  includeSuspended: boolean,
  isCalendarConnected: boolean | null,
) => {
  const query = supabase
    .from('recruiter_relation')
    .select(
      `manager_id, created_by, recruiter_user!public_recruiter_relation_user_id_fkey(${interviewPlanRecruiterUserQuery}, office_locations(*), departments(id,name)), roles(id,name)`,
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
        department_id: item?.recruiter_user?.departments?.id ?? null,
        departments: item?.recruiter_user?.departments || [],
        email: item?.recruiter_user?.email ?? '',
        first_name: item?.recruiter_user?.first_name ?? '',
        last_name: item?.recruiter_user?.last_name ?? '',
        profile_image: item?.recruiter_user?.profile_image ?? '',
        employment: item?.recruiter_user?.employment ?? 'fulltime',
        linked_in: item?.recruiter_user?.linked_in ?? '',
        office_location_id: item?.recruiter_user?.office_locations?.id ?? null,
        office_locations: item?.recruiter_user?.office_locations || [],
        user_id: item?.recruiter_user?.user_id ?? '',
        phone: item?.recruiter_user?.phone ?? '',
        position: item?.recruiter_user?.position ?? '',
        status: item?.recruiter_user?.status ?? 'active',
        role: item?.roles?.name ?? '',
        role_id: item?.roles?.id ?? '',
        manager_id: item?.manager_id ?? '',
        created_by: item?.created_by ?? '',
      }));

    return resAlter;
  });
};
