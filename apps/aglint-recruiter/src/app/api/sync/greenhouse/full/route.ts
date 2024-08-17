import axios from 'axios';
// import axios from 'axios';
import { NextRequest } from 'next/server';

import { routeHandlerFactory } from '@/src/utils/apiUtils/responseFactoryPro';

import { syncDepartments } from '../departments/process';
import { syncOfficeLocations } from '../office_locations/process';
import { GreenHouseUserSyncAPI } from '../user/type';
import { getDecryptKey, getLastSync } from '../util';
import { GreenHouseFullSyncAPI } from './type';

const baseUrl = process.env.NEXT_PUBLIC_HOST_NAME;
if (baseUrl) {
  new Error('NEXT_PUBLIC_HOST_NAME is not defined');
}
export function POST(request: NextRequest) {
  const method = routeHandlerFactory<GreenHouseFullSyncAPI>('POST', request);
  return method(
    async ({ body }) => {
      const { recruiter_id, key } = body;
      const decryptKey = await getDecryptKey(key);
      const lastSync = await getLastSync(recruiter_id);
      await syncDepartments(recruiter_id, decryptKey);
      await syncOfficeLocations(recruiter_id, decryptKey);
      await Promise.all([
        syncGreenhouseUsers(recruiter_id, key, lastSync.users),
        syncGreenhouseJobs(recruiter_id, key, lastSync.jobs),
      ]);
      return { success: true };
    },
    ['recruiter_id', 'key'],
  );
}

export async function syncGreenhouseUsers(
  recruiter_id: string,
  key: string,
  last_sync?: string,
) {
  const res = await axios.post<GreenHouseUserSyncAPI>(
    `${baseUrl}/api/sync/greenhouse/user`,
    {
      recruiter_id,
      key,
      last_sync,
    },
  );
  if (res.status !== 200) {
    // @ts-ignore
    throw new Error(res.data.message || 'Greenhouse users sync api failed!');
  }
  return res.data;
}

export async function syncGreenhouseJobs(
  recruiter_id: string,
  key: string,
  last_sync?: string,
) {
  const res = await axios.post<GreenHouseUserSyncAPI>(
    `${baseUrl}/api/sync/greenhouse/jobs`,
    {
      recruiter_id,
      key,
      last_sync,
    },
  );
  if (res.status !== 200) {
    // @ts-ignore
    throw new Error(res.data.message || 'Greenhouse users sync api failed!');
  }
  return res.data;
}
