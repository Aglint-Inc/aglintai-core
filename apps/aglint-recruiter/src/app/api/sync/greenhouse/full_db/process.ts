import { type DatabaseTable } from '@aglint/shared-types';

import { type SupabaseClientType } from '@/utils/supabase/supabaseAdmin';

import { syncDepartments } from '../departments/process';
import { syncGreenhouseJob } from '../jobs/process';
import { syncOfficeLocations } from '../office_locations/process';
import { syncUsers } from '../user/process';
import { setLastSync } from '../util';

const baseUrl = process.env.NEXT_PUBLIC_HOST_NAME;
if (baseUrl) {
  new Error('NEXT_PUBLIC_HOST_NAME is not defined');
}
export async function runFullSync({
  supabaseAdmin,
  recruiter_id,
  syncData,
  decryptKey,
}: {
  supabaseAdmin: SupabaseClientType;
  recruiter_id: string;
  syncData: DatabaseTable['integrations']['greenhouse_metadata'];
  decryptKey: string;
}) {
  const tempo_promises: Promise<any>[] = [];

  if (syncData.options['departments']) {
    tempo_promises.push(
      syncDepartments({ supabaseAdmin, recruiter_id, decryptKey }),
    );
  }

  if (syncData.options['office_locations']) {
    tempo_promises.push(
      syncOfficeLocations({
        supabaseAdmin,
        recruiter_id,
        decryptKey,
      }),
    );
  }

  await Promise.all(tempo_promises);

  const temp_promises: Promise<any>[] = [];

  if (syncData.options['users']) {
    temp_promises.push(
      syncUsers({
        recruiter_id,
        decryptKey,
        supabaseAdmin,
        last_sync: syncData.last_sync.users,
      }),
    );
  }
  if (syncData.options['jobs']) {
    temp_promises.push(
      syncGreenhouseJob({
        recruiter_id,
        decryptKey,
        supabaseAdmin,
        last_sync: syncData.last_sync.jobs,
      }),
    );
  }

  await Promise.all(temp_promises);

  await setLastSync(supabaseAdmin, recruiter_id, {
    full_sync: new Date().toISOString(),
  });
  return;
}
