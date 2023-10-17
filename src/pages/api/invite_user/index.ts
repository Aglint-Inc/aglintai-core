import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { Database } from '@/src/types/schema';
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export type InviteUserType = {
  users: { name: string; email: string; role: string }[];
  id: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { users, id } = req.body as unknown as InviteUserType;
    if (!users && !id) {
      return res
        .status(400)
        .send({ message: 'Invalid request. Required props missing.' });
    }
    const { role, recruiter_id: companyId } = await getRecruiter(id);
    if ('admin' === role) {
      for (let user of users) {
        const { data, error } = await supabase.auth.signUp({
          email: user.email,
          password: 'Test@123',
        });
        if (!error) {
          const email = data.user.email;
          const userId = data.user.id;
          const { data: users, error: userError } = await supabase
            .from('recruiter_user')
            .insert({
              recruiter_id: companyId,
              user_id: userId,
              first_name: user.name,
              role: user.role.toLocaleLowerCase(),
              email: email,
              join_status: 'invited',
            })
            .select();
          supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${process.env.NEXT_PUBLIC_HOST_NAME}reset-password`,
          });
          if (!userError) {
            return res.send({ users, error: null });
          } else {
            return res.status(200).send({
              userDetails: null,
              error: 'Error in creating and inviting the user.',
            });
          }
          // } else if (error.message === 'User already registered') {
          //   const userDetails = await getRecruiterByEmail(user.email);
          //   if (userDetails)
          //     return res.status(200).send({ userDetails, error: error });
        } else {
          return res.status(200).send({ users: null, error: error });
        }
      }
      return res
        .status(200)
        .send({ users: null, error: 'not supposed to be error' });
    }
    return res.status(200).send({ users: null, error: 'Permission denied!' });
  }
  res.setHeader('Allow', 'POST');
  res.status(405).end('Method Not Allowed!');
}

const getRecruiter = async (id: string) => {
  const { data, error } = await supabase
    .from('recruiter_user')
    .select('role, recruiter_id')
    .eq('user_id', id);
  if (!error && data.length) {
    return data[0];
  }
  return { role: null, recruiter_id: null };
};

// const getRecruiterByEmail = async (email: string) => {
//   const { data, error } = await supabase
//     .from('recruiter_user')
//     .select()
//     .eq('email', email);
//   if (!error && data.length) {
//     return data[0];
//   }
//   return { role: null, recruiter_id: null };
// };
