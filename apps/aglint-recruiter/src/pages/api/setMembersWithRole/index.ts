import { DatabaseTableUpdate, DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { server_getUserRoleAndId } from '../reset_password';
import { API_setMembersWithRole } from './type';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const { data, recruiter_id } =
        req.body as API_setMembersWithRole['request'];
      if (!data || !recruiter_id) {
        return res
          .status(400)
          .send(
            getResponse({ error: 'Invalid request. Required props missing.' }),
          );
      }
      const updater = await server_getUserRoleAndId({
        getVal: (name) => req.cookies[String(name)],
      });

      if (updater.user_id === data.user_id || updater.role !== 'admin') {
        throw new Error('Permission Rejected.');
      }

      let role = data.role;
      let manager_id = data.manager_id;
      delete data.role;
      delete data.manager_id;

      const userData = await setMembers(data);

      if (userData && role && updater.role === 'admin') {
        const temp = await setRelation({
          user_id: userData.user_id,
          recruiter_id,
          role,
          manager_id,
        });
        role = temp.role;
        manager_id = temp.manager_id;
      }

      return res.send(
        getResponse({
          data: {
            ...userData,
            role: role || undefined,
            manager_id: manager_id || undefined,
          },
        }),
      );
    } catch (error) {
      return res.send(getResponse({ error }));
    }
  }
  res.setHeader('Allow', 'POST');
  res.status(405).end('Method Not Allowed!');
}

const getResponse = (data: Partial<API_setMembersWithRole['response']>) => {
  return { data: null, error: null, ...data };
};

const setMembers = (
  data: Omit<DatabaseTableUpdate['recruiter_user'], 'user_id'> & {
    user_id: string;
  },
) => {
  return supabase
    .from('recruiter_user')
    .update(data)
    .eq('user_id', data.user_id)
    .select()
    .single()
    .then(({ data, error }) => {
      if (error) throw new Error(error.message);
      return data;
    });
};

const setRelation = (
  data: Omit<
    DatabaseTableUpdate['recruiter_relation'],
    'user_id' | 'recruiter_id'
  > & {
    user_id: string;
    recruiter_id: string;
  },
) => {
  return supabase
    .from('recruiter_relation')
    .update(data)
    .eq('user_id', data.user_id)
    .eq('recruiter_id', data.recruiter_id)
    .select('role, manager_id')
    .single()
    .then(({ data, error }) => {
      if (error) throw new Error(error.message);
      return data;
    });
};
