import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { Database } from '@/src/types/schema';

import { API_get_last_login } from './types';

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const { ids, recruiter_id } =
        req.body as unknown as API_get_last_login['request'];
      if (!ids?.length || !recruiter_id) {
        return res
          .status(400)
          .send(
            getResponse({ error: 'Invalid request. Required props missing.' }),
          );
      }

      const isAllowed = await checkPermissions({
        getVal: (name) => req.cookies[String(name)],
        roles: ['admin'],
        recruiter_id,
      });
      if (isAllowed) {
        const last_login_data = await Promise.all(
          ids.map((id) =>
            supabase.auth.admin.getUserById(id).then(({ data, error }) => {
              if (error) {
                throw new Error(error.message);
              }
              return { id, last_login: data.user.last_sign_in_at };
            }),
          ),
        );

        return res.status(200).send(
          getResponse({
            data: last_login_data,
          }),
        );
      }
      throw new Error('Request rejected!');
    } catch (error) {
      return res.status(200).send(
        getResponse({
          error: error || 'Internal Server Error.',
        }),
      );
    }
  }
}

import { createServerClient } from '@supabase/ssr';

import { CustomDatabase, DatabaseEnums } from '@/src/types/customSchema';

const getResponse = (data: Partial<API_get_last_login['response']>) => {
  return { data: false, error: null, ...data };
};

const checkPermissions = async ({
  getVal,
  roles,
  recruiter_id,
}: {
  // eslint-disable-next-line no-unused-vars
  getVal: (name: string) => string;
  roles: DatabaseEnums['user_roles'][];
  recruiter_id: string;
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
          .from('recruiter_relation')
          .select('role')
          .eq('user_id', data.user.id)
          .eq('recruiter_id', recruiter_id)
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
