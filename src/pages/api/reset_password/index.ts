import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { Database } from '@/src/types/schema';

import { API_reset_password } from './type';

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

const redirectTo = `${process.env.NEXT_PUBLIC_HOST_NAME}/reset-password`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { email } = req.body as unknown as API_reset_password['request'];
    if (!email) {
      return res
        .status(400)
        .send(
          getResponse({ error: 'Invalid request. Required props missing.' }),
        );
    }

    const isAllowed = await checkPermissions({
      getVal: (name) => req.cookies[String(name)],
      roles: ['admin'],
    });
    if (isAllowed) {
      const { error: emailError } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo,
        },
      );

      if (!emailError) {
        return res.send(getResponse({ passwordReset: true }));
      } else {
        return res.status(200).send(
          getResponse({
            error:
              emailError.message || 'Error in resending the invite to user.',
          }),
        );
      }
    }
    return res
      .status(200)
      .send(getResponse({ error: 'error in validations role' }));
  }
  res.setHeader('Allow', 'POST');
  res.status(405).end('Method Not Allowed!');
}

import { createServerClient } from '@supabase/ssr';

import { CustomDatabase, DatabaseEnums } from '@/src/types/customSchema';
const getResponse = (data: { passwordReset?: boolean; error?: string }) => {
  return { passwordReset: false, error: null, ...data };
};

const checkPermissions = async ({
  getVal,
  roles,
}: {
  // eslint-disable-next-line no-unused-vars
  getVal: (name: string) => string;
  roles: DatabaseEnums['user_roles'][];
}) => {
  try {
    const supabase = createServerClient<CustomDatabase>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return getVal(name);
          },
          //   set(name: string, value: string, options: { [key: string]: any }) {
          //     res.setHeader('Set-Cookie', `${name}=${value}; ${options}`);
          //   },
          //   remove(name: string) {
          //     res.setHeader('Set-Cookie', `${name}=; Max-Age=0`);
          //   },
        },
      },
    );

    return await supabase.auth.getUser().then(({ data, error }) => {
      if (error) throw new Error(error.message);
      if (data.user.id) {
        return supabase
          .from('recruiter_user')
          .select('role')
          .eq('user_id', data.user.id)
          .single()
          .then(({ data, error }) => {
            if (error) throw new Error(error.message);
            return roles.includes(data.role);
          });
      }
      throw new Error('Failed to load auth user.');
    });
  } catch (error) {
    throw new Error(error);
  }
};
