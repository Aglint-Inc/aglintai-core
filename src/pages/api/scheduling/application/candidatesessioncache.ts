/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
import { CookieOptions, createServerClient, serialize } from '@supabase/ssr';
import { NextApiRequest, NextApiResponse } from 'next';

import { SchedulingApplication } from '@/src/components/Scheduling/AllSchedules/SchedulingApplication/store';
import { createCloneSession } from '@/src/components/Scheduling/AllSchedules/SchedulingApplication/utils';
import { Database } from '@/src/types/schema';

export interface ApiBodyParamsSessionCache {
  is_get_more_option: boolean;
  application_id: string;
  allSessions: SchedulingApplication['initialSessions'];
  session_ids: string[];
  scheduleName: string;
  coordinator_id: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const supabase = createServerClient<Database>(
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

    const {
      allSessions,
      application_id,
      coordinator_id,
      is_get_more_option,
      scheduleName,
      session_ids,
    } = req.body as ApiBodyParamsSessionCache;

    const resClone = await createCloneSession({
      allSessions,
      application_id,
      coordinator_id,
      is_get_more_option,
      scheduleName,
      session_ids,
      supabase,
    });

    return res.status(200).send(resClone);
  } catch (error) {
    // console.log('error', error);
    res.status(400).send(error.message);
  }
};

export default handler;
