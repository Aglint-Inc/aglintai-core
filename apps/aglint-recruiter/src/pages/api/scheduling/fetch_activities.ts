import { DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { fetchAllActivities } from '@/src/components/Scheduling/CandidateDetails/queries/utils';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
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
      const { application_id, session_id } = req.body;
      if (application_id) {
        const resActivities = await fetchAllActivities({
          application_id,
          supabase,
          session_id,
        });
        return res.send({
          data: resActivities,
          error: null,
        } as ApiResponseActivities);
      } else {
        return res.send({
          data: null,
          error: 'missing requierd fields',
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
