/* eslint-disable security/detect-object-injection */
import {
  type CookieOptions,
  createServerClient,
  serialize,
} from '@supabase/ssr';
import { PostgrestError } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { JobApplication } from '@/src/context/JobApplicationsContext/types';

import { upsertNewJobApplicationDbAction } from './utils';

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
  const { inputData } = req.body as UpdateJobApplicationApi['request'];
  if (!inputData)
    res.status(400).send({ data: null, error: { message: 'Invalid fields' } });
  const { data, error } = await upsertNewJobApplicationDbAction(
    [inputData],
    supabase,
  );
  res.status(200).send({ data: data[0], error });
};

export default handler;

export type UpdateJobApplicationApi = {
  request: { inputData: Partial<JobApplication> };
  response: { data: JobApplication; error: PostgrestError };
};
