import { type NextRequest } from 'next/server';

import { routeHandlerFactory } from '@/utils/apiUtils/responseFactoryPro';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

import { runFullSync } from '../full_db/process';
import { getDecryptKey, getGreenhouseKey } from '../util';
import { type GreenHouseFullSyncAPI } from './type';

export function POST(request: NextRequest) {
  const method = routeHandlerFactory<GreenHouseFullSyncAPI>('POST', request);
  return method(
    async ({ requesterDetails, body }) => {
      const recruiter_id = requesterDetails.recruiter_id!;
      const { syncData } = body!;
      const supabaseAdmin = getSupabaseServer();
      const key = await getGreenhouseKey(supabaseAdmin, recruiter_id);
      if (!key) throw Error('Greenhouse key not found');
      const decryptKey = await getDecryptKey(key);
      await runFullSync({ supabaseAdmin, recruiter_id, syncData, decryptKey });
      return { success: true };
    },
    ['syncData'],
  );
}
