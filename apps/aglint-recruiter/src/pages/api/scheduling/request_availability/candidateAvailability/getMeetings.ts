/* eslint-disable security/detect-object-injection */
import { type DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { type fetchAllActivities } from '@/src/components/Scheduling/CandidateDetails/queries/utils';


const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
);
export type ApiResponseActivities =
  | {
      data: Awaited<ReturnType<typeof fetchAllActivities>>;
      error: null;
    }
  | {
      data: null;
      error: string | null;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'POST') {
      const { session_ids } = req.body;
      if (session_ids.length) {
        const { data: meetings, error: errSes } = await supabase
          .from('interview_session')
          .select('*,interview_meeting(*)')
          .in('id', session_ids)
          .order('session_order', {
            ascending: true,
          });
        if (errSes) {
          return res.send({
            data: null,
            error: errSes.message,
          } as ApiResponseActivities);
        }

        const reduceSess = meetings.map((ele) => {
          return {
            interview_session: ele,
            interview_meeting: ele.interview_meeting,
          };
        });
        return res.send({
          meetings: reduceSess,
        });
      } else {
        return res.send({
          data: null,
          error: 'missing required fields',
        } as ApiResponseActivities);
      }
    }
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed!');
  } catch (err) {
    return res.status(500).send({
      data: null,
      error: err,
    } as ApiResponseActivities);
  }
}
