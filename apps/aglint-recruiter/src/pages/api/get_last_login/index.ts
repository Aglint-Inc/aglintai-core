import { DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { API_get_last_login } from './types';

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
      const { ids, recruiter_id } =
        req.body as unknown as API_get_last_login['request'];
      if (!ids?.length || !recruiter_id) {
        return res
          .status(400)
          .send(
            getResponse({ error: 'Invalid request. Required props missing.' }),
          );
      }

      // const isAllowed = await server_checkUserRolePermissions({
      //   getVal: (name) => req.cookies[String(name)],
      //   roles: ['admin'],
      // });

      const isAllowed = true; // fix-this
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

const getResponse = (data: Partial<API_get_last_login['response']>) => {
  return { data: false, error: null, ...data };
};
