/* eslint-disable security/detect-object-injection */
import { DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { fetchAllActivities } from '@/src/components/Scheduling/CandidateDetails/queries/utils';


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
      const { data } = req.body;
      if (data.application_id) {
        const { error, data: logs } = await supabase
          .from('application_logs')
          .insert({
            ...data,
          })
          .select()
          .single();
        if (!error) {
          return res.send(logs);
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
