import { type DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { fetchInterviewSessionTask } from '@/src/components/Scheduling/CandidateDetails/utils';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export type ApiResponseInterviewSessionTask =
  | {
      data: Awaited<ReturnType<typeof fetchInterviewSessionTask>>;
      error: null;
    }
  | {
      data: null;
      error: string | null;
    };

export type ApiRequestInterviewSessionTask = {
  job_id: string;
  application_id: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'POST') {
      const { job_id, application_id } =
        req.body as ApiRequestInterviewSessionTask;
      if (job_id && application_id) {
        const resIntSesTask = await fetchInterviewSessionTask({
          job_id,
          application_id,
          supabase,
        });
        return res.send({
          data: resIntSesTask,
          error: null,
        } as ApiResponseInterviewSessionTask);
      } else {
        return res.send({
          data: null,
          error: 'missing requierd fields',
        } as ApiResponseInterviewSessionTask);
      }
    }
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed!');
  } catch (e) {
    return res.send({
      data: null,
      error: e,
    });
  }
}
