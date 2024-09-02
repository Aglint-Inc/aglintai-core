import { type NextRequest } from 'next/server';

import { routeHandlerFactory } from '@/src/utils/apiUtils/responseFactoryPro';
import { getSupabaseServer } from '@/src/utils/supabase/supabaseAdmin';

import { getSyncDetails } from '../util';
import { runFullSync } from './process';
import { type GreenHouseFullSyncAPI } from './type';

export function POST(request: NextRequest) {
  const method = routeHandlerFactory<GreenHouseFullSyncAPI>('POST', request);
  return method(
    async ({ body }) => {
      const { recruiter_id, key } = body;
      const supabaseAdmin = getSupabaseServer();
      const syncData = await getSyncDetails(supabaseAdmin, recruiter_id);
      await runFullSync(supabaseAdmin, recruiter_id, syncData, key);
      return { success: true };
    },
    ['recruiter_id', 'key'],
  );
}
