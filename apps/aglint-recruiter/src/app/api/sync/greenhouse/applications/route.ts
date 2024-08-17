// import axios from 'axios';
import { NextRequest } from 'next/server';

import { routeHandlerFactory } from '@/src/utils/apiUtils/responseFactoryPro';

import { getDecryptKey } from '../util';
import { syncGreenhouseApplication } from './process';
import { GreenHouseApplicationsAPI } from './type';

export function POST(request: NextRequest) {
  const method = routeHandlerFactory<GreenHouseApplicationsAPI>(
    'POST',
    request,
  );
  return method(
    async ({ body }) => {
      const { recruiter_id, job_id, remote_id, key, last_sync } = body;
      const decryptKey = await getDecryptKey(key);
      await syncGreenhouseApplication(
        decryptKey,
        job_id,
        remote_id,
        recruiter_id,
        last_sync,
      );
      return { success: true };
    },
    ['recruiter_id', 'job_id', 'remote_id', 'key'],
  );
}
