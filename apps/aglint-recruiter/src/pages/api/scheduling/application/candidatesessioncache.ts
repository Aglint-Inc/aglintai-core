/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
import { DB } from '@aglint/shared-types';
import { CookieOptions, createServerClient, serialize } from '@supabase/ssr';
import { NextApiRequest, NextApiResponse } from 'next';

import { SchedulingApplication } from '@/src/components/Scheduling/CandidateDetails/store';
import { createCloneSession } from '@/src/components/Scheduling/CandidateDetails/utils';

export interface ApiBodyParamsSessionCache {
  is_get_more_option: boolean;
  application_id: string;
  allSessions: SchedulingApplication['initialSessions'];
  session_ids: string[];
  scheduleName: string;
  coordinator_id: string;
  recruiter_id: string;
  rec_user_id: string;
}

export type ApiResponseSessionCache = Awaited<
  ReturnType<typeof createCloneSession>
>;
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const supabase = createServerClient<DB>(
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
      is_get_more_option,
      scheduleName,
      session_ids,
      recruiter_id,
      rec_user_id,
    } = req.body as ApiBodyParamsSessionCache;

    const resClone = await createCloneSession({
      allSessions,
      application_id,
      is_get_more_option,
      scheduleName,
      session_ids,
      supabase,
      recruiter_id,
      rec_user_id,
      meeting_flow: 'self_scheduling',
    });

    return res.status(200).send(resClone);
  } catch (error) {
    // console.log('error', error);
    res.status(400).send(error.message);
  }
};

export default handler;
