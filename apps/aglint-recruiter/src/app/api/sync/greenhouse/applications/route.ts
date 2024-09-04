// import axios from 'axios';
import { type NextRequest } from 'next/server';

import { routeHandlerFactory } from '@/utils/apiUtils/responseFactoryPro';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

import { getDecryptKey } from '../util';
import { syncGreenhouseApplication } from './process';
import { type GreenHouseApplicationsAPI } from './type';

export function POST(request: NextRequest) {
  const method = routeHandlerFactory<GreenHouseApplicationsAPI>(
    'POST',
    request,
  );
  return method(
    async ({ body }) => {
      const { recruiter_id, job_id, remote_id, key, last_sync } = body;
      const decryptKey = await getDecryptKey(key);
      const supabaseAdmin = getSupabaseServer();
      await syncGreenhouseApplication(
        supabaseAdmin,
        decryptKey,
        job_id,
        remote_id,
        recruiter_id,
        last_sync,
      );
      return { success: true };
    },
    ['recruiter_id', 'job_id', 'remote_id', 'key'],
  );
}
