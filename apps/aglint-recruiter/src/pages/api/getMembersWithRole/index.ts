import { DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';

import {
  NextApiRequest,
  NextApiResponse,
} from '@/src/interface/NextApiRequest.interface';
import { apiRequestHandlerFactory } from '@/src/utils/apiUtils/responseFactory';

import { API_getMembersWithRole } from './type';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const apiMethod = apiRequestHandlerFactory<API_getMembersWithRole>(req, res, {
    name: '/api/getMembersWithRole',
  });
  return apiMethod('GET', async ({ requesterDetails }, logger) => {
    const rec_id = requesterDetails.recruiter_id;
    if (!rec_id) {
      return {
        error: rec_id
          ? 'Failed to load recruiter'
          : 'Invalid request. Required props missing.',
        status: 400,
      };
    }
    logger?.info({ message: 'hi its working' });
    return getMembers(rec_id);
  });
}

const getMembers = (id: string) => {
  return supabase
    .from('recruiter_relation')
    .select(
      'id, role_id, manager_id, created_by,recruiter_user!public_recruiter_relation_user_id_fkey(*), roles(name)',
    )
    .eq('recruiter_id', id)
    .then(({ data, error }) => {
      if (error) throw new Error(error.message);
      return data.map((item) => ({
        ...item.recruiter_user,
        created_by: item.created_by,
        role: item.roles?.name,
        role_id: item.role_id,
        manager_id: item.manager_id,
        recruiter_relation_id: item.id,
      }));
    });
};
