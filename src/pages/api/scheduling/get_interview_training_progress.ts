import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { getInterviewTrainingProgress } from '@/src/queries/scheduling-dashboard';
import { CustomDatabase } from '@/src/types/customSchema';

const supabase = createClient<CustomDatabase>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { recruiter_id } = req.body;
    if (recruiter_id) {
      const resTrainingProgress = await getInterviewTrainingProgress({
        recruiter_id,
        supabase,
      });

      return res.send(resTrainingProgress);
    } else {
      return res.send([]); // do error handling
    }
  }
  res.setHeader('Allow', 'POST');
  res.status(405).end('Method Not Allowed!');
}
