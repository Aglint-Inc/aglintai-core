import { NextRequest } from 'next/server';

import { routeHandlerFactory } from '@/src/utils/apiUtils/responseFactoryPro';

import { syncDepartments } from '../departments/process';
import { syncGreenhouseJobs, syncGreenhouseUsers } from '../full_db/process';
import { syncOfficeLocations } from '../office_locations/process';
import { getDecryptKey, getGreenhouseKey } from '../util';
import { GreenHouseFullSyncAPI } from './type';

export function POST(request: NextRequest) {
  const method = routeHandlerFactory<GreenHouseFullSyncAPI>('POST', request);
  return method(
    async ({ requesterDetails, body }) => {
      const { recruiter_id } = requesterDetails;
      const { syncData } = body;
      const key = await getGreenhouseKey(recruiter_id);
      const decryptKey = await getDecryptKey(key);
      // const lastSync = await getLastSync(recruiter_id);
      if (syncData.options['departments']) {
        await syncDepartments(recruiter_id, decryptKey);
      }
      if (syncData.options['office_locations']) {
        await syncOfficeLocations(recruiter_id, decryptKey);
      }
      const temp_promises: Promise<any>[] = [];
      if (syncData.options['users']) {
        syncGreenhouseUsers(recruiter_id, key, syncData.last_sync.users);
      }
      if (syncData.options['jobs']) {
        temp_promises.push(syncGreenhouseJobs(recruiter_id, key));
      }
      await Promise.all(temp_promises);
      return { success: true };
    },
    ['syncData'],
  );
}
