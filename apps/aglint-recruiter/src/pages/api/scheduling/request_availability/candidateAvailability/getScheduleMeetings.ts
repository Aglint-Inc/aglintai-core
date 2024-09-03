/* eslint-disable security/detect-object-injection */
import { type DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { fetchAllActivities } from '../../fetch_activities';

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
      const { application_id } = req.body;
      if (application_id) {
        const { data: sch, error: errSch } = await supabase
          .from('interview_schedule')
          .select(
            '*,applications(*, public_jobs(id,job_title,location,recruiter_id),candidates(*),candidate_files(id,file_url,candidate_id,resume_json,type)),recruiter(id,logo,name)',
          )
          .eq('application_id', application_id)
          .single();
        if (errSch) {
          return res.send({
            data: null,
            error: errSch.message,
          } as ApiResponseActivities);
        }
        return res.send(sch);
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
