import { DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { NextRequest } from 'next/server';

import { routeHandlerFactory } from '@/src/utils/apiUtils/responseFactoryPro';

import { getGreenhouseKey } from '../../utils';
import { syncGreenhouseJobPlan } from '../interview_plans/process';
import { createSyncedJob, syncJobApplications } from './process';
import { GreenhouseJobSyncAPI } from './type';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export function POST(request: NextRequest) {
  const method = routeHandlerFactory<GreenhouseJobSyncAPI>('POST', request);
  return method(
    async ({ requesterDetails, body }) => {
      const { recruiter_id } = requesterDetails;
      const { ats_job: job_post } = body;
      const key = await getGreenhouseKey(supabase, recruiter_id);
      // const job_post = await getGreenhouseJob(supabase, key, ats_job.job_id);
      const ats_job_id = job_post.job_id;
      const public_job_id = await createSyncedJob(
        supabase,
        job_post,
        recruiter_id,
      );
      await syncGreenhouseJobPlan(
        supabase,
        {
          recruiter_id,
          ats_job_id,
          public_job_id,
        },
        key,
      );
      await syncJobApplications(
        supabase,
        {
          job_id: job_post.job_id,
          public_job_id,
          recruiter_id,
        },
        key,
      );
      return public_job_id;
    },
    ['ats_job'],
  );
}
