import { CustomDatabase } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { API_getMembersWithRole } from './type';

const supabase = createClient<CustomDatabase>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { id } = req.body as API_getMembersWithRole['request'];
    if (!id) {
      return res
        .status(400)
        .send(
          getResponse({ error: 'Invalid request. Required props missing.' }),
        );
    }

    return res.send(getResponse({ members: await getMembers(id) }));
  }
  res.setHeader('Allow', 'POST');
  res.status(405).end('Method Not Allowed!');
}
const getResponse = (data: Partial<API_getMembersWithRole['response']>) => {
  return { passwordReset: false, error: null, ...data };
};

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
