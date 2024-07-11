/* eslint-disable security/detect-object-injection */
import { DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { fetchAllActivities } from '@/src/components/Scheduling/CandidateDetails/hooks';
import { userTzDayjs } from '@/src/services/CandidateScheduleV2/utils/userTzDayjs';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

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
      const { data, id } = req.body;
      if (data) {
        const { error, data: candidateAvailability } = await supabase
          .from('candidate_request_availability')
          .update({
            ...data,
          })
          .eq('id', id)
          .select(
            '*,request_session_relation( interview_session(*) ), applications ( candidate_id, candidates ( * ), public_jobs ( logo,company ) )',
          )
          .single();
        await supabaseAdmin
          .from('candidates')
          .update({ timezone: userTzDayjs.tz.guess() })
          .eq('id', candidateAvailability?.applications?.candidates?.id)
          .throwOnError();
        if (!error) {
          return res.send(candidateAvailability);
        }
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
