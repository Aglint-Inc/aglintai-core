import { DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { apiRequestHandlerFactory } from '@/src/utils/apiUtils/responseFactory';

import { GetUserDetailsAPI } from './type';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const requestHandler = apiRequestHandlerFactory<GetUserDetailsAPI>(req, res);
  requestHandler(
    'GET',
    async ({ requesterDetails }) => {
      const { user_id } = requesterDetails;
      const result = await getRecruiterDetails(user_id);
      return { ...result, primary: result.recruiter.primary_admin === user_id };
    },
    [],
  );
}

export const getRecruiterDetails = async (user_id: string) => {
  const temp = (
    await supabase
      .from('recruiter_relation')
      .select(
        '*, recruiter(*, office_locations(*), departments(id,name)), recruiter_user!public_recruiter_relation_user_id_fkey(*), manager_details:recruiter_user!recruiter_relation_manager_id_fkey(first_name,last_name,position), roles(name,role_permissions(permissions!inner(name)))',
      )
      .match({ user_id, is_active: true })
      .single()
      .throwOnError()
  ).data;

  const recruiter_user = {
    ...temp.recruiter_user,
    role: temp.roles.name,
    role_id: temp.role_id,
    department: temp.recruiter?.departments?.find(
      (dep) => dep.id == temp.recruiter_user.department_id,
    ),
    office_location: temp.recruiter?.office_locations?.find(
      (loc) => loc.id == temp.recruiter_user.office_location_id,
    ),
    manager_id: temp.manager_id,
    manager_details: temp.manager_details
      ? {
          name: `${temp.manager_details.first_name} ${temp.manager_details.last_name}`.trim(),
          position: temp.manager_details.position,
        }
      : null,
    created_by: temp.created_by,
    recruiter_relation_id: temp.id,
    recruiter_id: temp.recruiter_id,
  };

  return {
    ...temp,
    recruiter_user,
  };
};
