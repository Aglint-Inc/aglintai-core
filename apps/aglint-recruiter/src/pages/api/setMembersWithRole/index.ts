import { DatabaseTableUpdate, DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { apiRequestHandlerFactory } from '@/src/utils/apiUtils/responseFactory';

import { API_setMembersWithRole } from './type';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const requestHandler = apiRequestHandlerFactory<API_setMembersWithRole>(
    req,
    res,
  );
  requestHandler(
    'POST',
    async ({ requesterDetails, body }) => {
      const { role: temp_role, recruiter_id } = requesterDetails;
      const { data } = body;

      // if (user_id === data.user_id || temp_role !== 'admin') {
      //   throw new Error('Permission denied.');
      // }
      let role: string;
      let role_id = data.role_id;
      let manager_id = data.manager_id;
      delete data.role_id;
      delete data.manager_id;
      const userData = await setMembers(data);

      if (userData && temp_role == 'admin') {
        const temp = await setRelation({
          user_id: userData.user_id,
          recruiter_id,
          role_id,
          manager_id,
        });
        role = temp.role;
        role_id = temp.role_id;
        manager_id = temp.manager_id;
      }
      return {
        data: {
          ...userData,
          ...{ role: role, role_id: role_id || undefined },
          manager_id: manager_id || undefined,
        },
      };
    },
    ['data'],
  );
}

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
    .select('role_id, manager_id, roles(name)')
    .single()
    .then(({ data, error }) => {
      if (error) throw new Error(error.message);
      return {
        role: data.roles.name,
        role_id: data.role_id,
        manager_id: data.manager_id,
      };
    });
};
