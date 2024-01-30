import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { InviteUserAPIType, RecruiterUserType } from '@/src/types/data.types';
import { Database } from '@/src/types/schema';
import { companyType } from '@/src/utils/userRoles';

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

const redirectTo = `${process.env.NEXT_PUBLIC_HOST_NAME}/reset-password`;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { users, id } = req.body as unknown as InviteUserAPIType['in'];
    if (!users && !id) {
      return res
        .status(400)
        .send({ message: 'Invalid request. Required props missing.' });
    }
    const { role, recruiter_id: companyId } = await getRecruiterUser(id);

    if ('admin' === role) {
      let user_id: string = null;
      try {
        for (let user of users) {
          const { data, error } = await supabase.auth.signUp({
            email: user.email,
            password: 'Aglint@123',
            options: {
              data: {
                role: companyType.COMPANY,
              },
            },
          });
          user_id = data.user.id;
          await supabase.auth.signOut();
          if (error) throw new Error(error.message);
          const email = data.user.email;
          const userId = data.user.id;
          await supabase
            .from('recruiter_user')
            .insert({
              user_id: userId,
              first_name: user.name,
              role: user.role.toLocaleLowerCase(),
              email: email,
              join_status: 'invited',
            } as RecruiterUserType)
            .then(({ error }) => {
              if (error) throw new Error(error.message);
            });

          await supabase
            .from('recruiter_relation')
            .insert({
              recruiter_id: companyId,
              user_id: userId,
              is_active: true,
              created_by: id,
            })
            .then(({ error }) => {
              if (error) throw new Error(error.message);
            });

          await supabase.auth
            .resetPasswordForEmail(email, {
              redirectTo,
            })
            .then(({ error }) => {
              if (error) throw new Error(error.message);
            });
        }
        res.status(200).send({ created: true, error: null });
      } catch (error: any) {
        user_id && supabase.auth.admin.deleteUser(user_id);
        return res.status(200).send({ created: null, error: error.message });
      }
    }
    return res.status(200).send({ created: null, error: 'Permission denied!' });
  }
  res.setHeader('Allow', 'POST');
  res.status(405).end('Method Not Allowed!');
}

const getRecruiterUser = async (id: string) => {
  const { data, error } = await supabase
    .from('recruiter_user')
    .select('role, recruiter_id')
    .eq('user_id', id);
  if (error) throw new Error(error.message);
  if (data?.length === 0) throw new Error('User not found');
  return data[0];
};
