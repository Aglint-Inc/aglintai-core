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
      return result;
    },
    [],
  );
}

export const getRecruiterDetails = async (user_id: string) => {
  return (
    await supabase
      .from('recruiter_relation')
      .select(
        '*, recruiter(*), recruiter_user!public_recruiter_relation_user_id_fkey(*), manager_details:recruiter_user!recruiter_relation_manager_id_fkey(first_name,last_name,position), roles(name,role_permissions(permissions!inner(name)))',
      )
      .match({ user_id, is_active: true })
      .single()
      .throwOnError()
  ).data;
};
