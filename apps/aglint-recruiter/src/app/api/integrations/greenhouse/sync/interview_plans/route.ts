import { createClient } from '@supabase/supabase-js';
// import axios from 'axios';
import { NextRequest } from 'next/server';

import { routeHandlerFactory } from '@/src/utils/apiUtils/responseFactoryPro';

import { syncGreenhouseJobPlan } from './process';
import { GreenhouseInterviewPlansAPI } from './type';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);
const decryptKey = process.env.ENCRYPTION_KEY!;
if (!decryptKey) {
  throw new Error('ENCRYPTION_KEY is not defined');
}
export function POST(request: NextRequest) {
  const method = routeHandlerFactory<GreenhouseInterviewPlansAPI>(
    'POST',
    request,
  );
  return method(
    async ({ requesterDetails, body }) => {
      const { recruiter_id } = requesterDetails;
      const { ats_job_id, public_job_id } = body;
      return syncGreenhouseJobPlan(supabase, {
        ats_job_id: ats_job_id,
        public_job_id,
        recruiter_id,
      });
    },
    ['ats_job_id', 'public_job_id'],
  );
}
