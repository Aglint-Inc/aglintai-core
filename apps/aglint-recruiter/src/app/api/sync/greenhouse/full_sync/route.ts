import { type NextRequest } from 'next/server';

import { routeHandlerFactory } from '@/src/utils/apiUtils/responseFactoryPro';
import { getSupabaseServer } from '@/src/utils/supabase/supabaseAdmin';

import { runFullSync } from '../full_db/process';
import { getGreenhouseKey } from '../util';
import { type GreenHouseFullSyncAPI } from './type';

export function POST(request: NextRequest) {
  const method = routeHandlerFactory<GreenHouseFullSyncAPI>('POST', request);
  return method(
    async ({ requesterDetails, body }) => {
      const { recruiter_id } = requesterDetails;
      const { syncData } = body;
      const supabaseAdmin = getSupabaseServer();
      const key = await getGreenhouseKey(supabaseAdmin, recruiter_id);
      await runFullSync(supabaseAdmin, recruiter_id, syncData, key);
      return { success: true };
    },
    ['syncData'],
  );
}
