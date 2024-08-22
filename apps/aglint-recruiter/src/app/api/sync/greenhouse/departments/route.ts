// import axios from 'axios';
import { NextRequest } from 'next/server';

import { routeHandlerFactory } from '@/src/utils/apiUtils/responseFactoryPro';
import { getSupabaseServer } from '@/src/utils/supabase/supabaseAdmin';

import { getDecryptKey } from '../util';
import { syncDepartments } from './process';
import { GreenHouseFullSyncAPI } from './type';

export function POST(request: NextRequest) {
  const method = routeHandlerFactory<GreenHouseFullSyncAPI>('POST', request);
  return method(
    async ({ body }) => {
      const { recruiter_id, key } = body;
      const decryptKey = await getDecryptKey(key);
      const supabaseAdmin = getSupabaseServer();
      // const lastSync =
      //   lastSync || (await getLastSync(recruiter_id)).departments;
      await syncDepartments(supabaseAdmin, recruiter_id, decryptKey);
      return { success: true };
    },
    ['recruiter_id', 'key'],
  );
}
