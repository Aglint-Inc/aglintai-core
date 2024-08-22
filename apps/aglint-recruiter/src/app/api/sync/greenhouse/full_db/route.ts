import { NextRequest } from 'next/server';

import { routeHandlerFactory } from '@/src/utils/apiUtils/responseFactoryPro';
import { getSupabaseServer } from '@/src/utils/supabase/supabaseAdmin';

import { syncDepartments } from '../departments/process';
import { syncOfficeLocations } from '../office_locations/process';
import { getDecryptKey, getLastSync } from '../util';
import { syncGreenhouseJobs, syncGreenhouseUsers } from './process';
import { GreenHouseFullSyncAPI } from './type';

export function POST(request: NextRequest) {
  const method = routeHandlerFactory<GreenHouseFullSyncAPI>('POST', request);
  return method(
    async ({ body }) => {
      const { recruiter_id, key } = body;
      const decryptKey = await getDecryptKey(key);
      const supabaseAdmin = getSupabaseServer();
      const lastSync = await getLastSync(supabaseAdmin, recruiter_id);
      await syncDepartments(supabaseAdmin, recruiter_id, decryptKey);
      await syncOfficeLocations(supabaseAdmin, recruiter_id, decryptKey);
      await Promise.all([
        syncGreenhouseUsers(recruiter_id, key, lastSync.users),
        syncGreenhouseJobs(recruiter_id, key, lastSync.jobs),
      ]);
      return { success: true };
    },
    ['recruiter_id', 'key'],
  );
}
