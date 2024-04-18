/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
import { CookieOptions, createServerClient, serialize } from '@supabase/ssr';
import { NextApiRequest, NextApiResponse } from 'next';

import { scheduleWithAgent } from '@/src/components/Scheduling/AllSchedules/SchedulingApplication/hooks';
import { Database } from '@/src/types/schema';

export interface ApiBodyParamsScheduleAgent {
  type: 'phone_agent' | 'email_agent';
  session_ids: string[];
  application_id: string;
  dateRange: {
    start_date: string | null;
    end_date: string | null;
  };
  recruiter_id: string;
  sub_task_id: string;
  recruiter_user_name: string;
  candidate_name?: string;
  company_name?: string;
  rec_user_email: string;
  rec_user_phone: string;
  rec_user_id: string;
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
      application_id,
      dateRange,
      rec_user_id,
      rec_user_email,
      rec_user_phone,
      recruiter_id,
      recruiter_user_name,
      session_ids,
      sub_task_id,
      type,
      candidate_name,
      company_name,
    } = req.body as ApiBodyParamsScheduleAgent;

    const resAgent = await scheduleWithAgent({
      application_id,
      dateRange,
      recruiter_id,
      recruiter_user_name,
      session_ids,
      sub_task_id: sub_task_id,
      type: type,
      candidate_name: candidate_name,
      company_name: company_name,
      rec_user_email,
      rec_user_phone,
      rec_user_id,
      supabase,
    });

    return res.status(200).send(resAgent);
  } catch (error) {
    // console.log('error', error);
    res.status(400).send(error.message);
  }
};

export default handler;
