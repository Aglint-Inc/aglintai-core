/* eslint-disable security/detect-object-injection */
import {
  type CookieOptions,
  createServerClient,
  serialize,
} from '@supabase/ssr';
import { PostgrestError } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { deleteNewJobApplicationDbAction } from './utils';

export type DeleteJobApplicationApi = {
  request: { application_id: string };
  response: { data: boolean; error: PostgrestError };
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies[name];
        },
        set(name: string, value: string, options: CookieOptions) {
          res.setHeader('Set-Cookie', serialize(name, value, options));
        },
        remove(name: string, options: CookieOptions) {
          res.setHeader('Set-Cookie', serialize(name, '', options));
        },
      },
    },
  );
  const { application_id } = req.body as DeleteJobApplicationApi['request'];
  if (!application_id)
    res.status(400).send({ data: null, error: { message: 'Invalid fields' } });
  const result = await deleteNewJobApplicationDbAction(
    application_id,
    supabase,
  );
  res.status(200).send(result);
};

export default handler;
