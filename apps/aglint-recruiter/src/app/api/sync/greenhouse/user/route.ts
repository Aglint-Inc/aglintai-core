// import axios from 'axios';
import { type NextRequest } from 'next/server';

import { routeHandlerFactory } from '@/src/utils/apiUtils/responseFactoryPro';
import { getSupabaseServer } from '@/src/utils/supabase/supabaseAdmin';

import { getDecryptKey } from '../util';
import { syncUsers } from './process';
import { type GreenHouseUserSyncAPI } from './type';

export const dynamic = 'force-dynamic';

export function POST(request: NextRequest) {
  const supabaseAdmin = getSupabaseServer();
  const method = routeHandlerFactory<GreenHouseUserSyncAPI>('POST', request);
  return method(
    async ({ body }) => {
      const { recruiter_id, key, last_sync } = body;
      const decryptKey = await getDecryptKey(key);
      await syncUsers(supabaseAdmin, recruiter_id, decryptKey, last_sync);
      return { success: true };
    },
    ['recruiter_id', 'key'],
  );
}
