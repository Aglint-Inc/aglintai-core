/* eslint-disable security/detect-object-injection */
import {
  type CookieOptions,
  createServerClient,
  serialize,
} from '@supabase/ssr';
import { PostgrestError } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import {
  JobApplication,
  NewJobApplications,
} from '@/src/context/JobApplicationsContext/types';

import { upsertNewJobApplicationDbAction } from './utils';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<BulkCreateJobApplicationApi['response']>,
) => {
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
  const { inputData } = req.body as BulkCreateJobApplicationApi['request'];
  const result = await upsertNewJobApplicationDbAction(inputData, supabase);
  res.status(200).send(result);
};

export default handler;

export type BulkCreateJobApplicationApi = {
  request: { inputData: Partial<JobApplication>[] };
  response: { data: NewJobApplications[]; error: PostgrestError };
};
