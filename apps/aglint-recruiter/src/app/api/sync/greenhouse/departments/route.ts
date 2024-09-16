// import axios from 'axios';
import { type NextRequest } from 'next/server';

import { routeHandlerFactory } from '@/utils/apiUtils/responseFactoryPro';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

import { getDecryptKey } from '../util';
import { syncDepartments } from './process';
import { type GreenHouseFullSyncAPI } from './type';

export function POST(request: NextRequest) {
  const method = routeHandlerFactory<GreenHouseFullSyncAPI>('POST', request);
  return method(
    async ({ body }) => {
      const { recruiter_id, key } = body;
      const decryptKey = await getDecryptKey(key);
      const supabaseAdmin = getSupabaseServer();
      // const lastSync =
      //   lastSync || (await getLastSync(recruiter_id)).departments;
      await syncDepartments({ supabaseAdmin, recruiter_id, decryptKey });
      return { success: true };
    },
    ['recruiter_id', 'key'],
  );
}
