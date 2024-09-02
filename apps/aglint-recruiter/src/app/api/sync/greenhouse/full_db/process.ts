import { type DatabaseTable } from '@aglint/shared-types';
import axios from 'axios';

import { type SupabaseClientType } from '@/src/utils/supabase/supabaseAdmin';

import { syncDepartments } from '../departments/process';
import { type GreenHouseJobsSyncAPI } from '../jobs/type';
import { syncOfficeLocations } from '../office_locations/process';
import { type GreenHouseUserSyncAPI } from '../user/type';
import { getDecryptKey, setLastSync } from '../util';

const baseUrl = process.env.NEXT_PUBLIC_HOST_NAME;
if (baseUrl) {
  new Error('NEXT_PUBLIC_HOST_NAME is not defined');
}
export async function runFullSync(
  supabaseAdmin: SupabaseClientType,
  recruiter_id: string,
  syncData: DatabaseTable['integrations']['greenhouse_metadata'],
  key: string,
) {
  const decryptKey = await getDecryptKey(key);
  if (syncData.options['departments']) {
    await syncDepartments(supabaseAdmin, recruiter_id, decryptKey);
  }
  if (syncData.options['office_locations']) {
    await syncOfficeLocations(supabaseAdmin, recruiter_id, decryptKey);
  }
  const temp_promises: Promise<any>[] = [];
  if (syncData.options['users']) {
    syncGreenhouseUsers(recruiter_id, key, syncData.last_sync.users);
  }
  if (syncData.options['jobs']) {
    temp_promises.push(syncGreenhouseJobs(recruiter_id, key));
  }
  await Promise.all(temp_promises);
  await setLastSync(supabaseAdmin, recruiter_id, {
    full_sync: new Date().toISOString(),
  });
  return;
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
  const res = await axios.post<GreenHouseJobsSyncAPI>(
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
