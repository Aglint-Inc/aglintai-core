import { DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';

import {
  NextApiRequest,
  NextApiResponse,
} from '@/src/interface/NextApiRequest.interface';

import { API_getMembersWithRole } from './type';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const getResponse = (
    {
      data,
      error,
    }: { data?: Partial<API_getMembersWithRole['response']>; error?: string },
    status?: number,
  ) => {
    status = status || (error ? 500 : 200);
    return res.status(status).send(status == 200 ? data : { error });
  };

  if (req.method === 'GET') {
    const rec_id = req.headers['x-requester-rec_id'] as string;

    // console.log('api_role', role, rec_id);

    if (!rec_id) {
      return getResponse(
        {
          error: rec_id
            ? 'Failed to load detect recruiter'
            : 'Invalid request. Required props missing.',
        },
        400,
      );
    }

    return getResponse({ data: await getMembers(rec_id) }, 200);
  }
  res.setHeader('Allow', 'GET');
  res.status(405).end('Method Not Allowed!');
}

const getMembers = (id: string) => {
  return supabase
    .from('recruiter_relation')
    .select(
      'role, manager_id, recruiter_user!public_recruiter_relation_user_id_fkey(*)',
    )
    .eq('recruiter_id', id)
    .then(({ data, error }) => {
      if (error) throw new Error(error.message);
      return data.map((item) => ({
        ...item.recruiter_user,
        role: item.role,
        manager_id: item.manager_id,
      }));
    });
};
