// import axios from 'axios';
import { type NextRequest } from 'next/server';

import { routeHandlerFactory } from '@/src/utils/apiUtils/responseFactoryPro';
import { getSupabaseServer } from '@/src/utils/supabase/supabaseAdmin';

import { getDecryptKey } from '../util';
import { syncGreenhouseJob } from './process';
import { type GreenHouseJobsSyncAPI } from './type';

export function POST(request: NextRequest) {
  const method = routeHandlerFactory<GreenHouseJobsSyncAPI>('POST', request);
  return method(
    async ({ body }) => {
      const { recruiter_id, key, last_sync } = body;
      const supabaseAdmin = getSupabaseServer();
      const decryptKey = await getDecryptKey(key);
      await syncGreenhouseJob(
        supabaseAdmin,
        decryptKey,
        recruiter_id,
        last_sync,
      );
      return { success: true };
    },
    ['recruiter_id', 'key'],
  );
}
