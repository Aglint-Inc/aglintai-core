// import axios from 'axios';
import { NextRequest } from 'next/server';

import { routeHandlerFactory } from '@/src/utils/apiUtils/responseFactoryPro';

import { getDecryptKey } from '../util';
import { syncOfficeLocations } from './process';
import { GreenHouseFullSyncAPI } from './type';

export function POST(request: NextRequest) {
  const method = routeHandlerFactory<GreenHouseFullSyncAPI>('POST', request);
  return method(
    async ({ body }) => {
      const { recruiter_id, key } = body;
      const decryptKey = await getDecryptKey(key);
      // const lastSync =
      //   lastSync || (await getLastSync(recruiter_id)).departments;
      await syncOfficeLocations(recruiter_id, decryptKey);
      return { success: true };
    },
    ['recruiter_id', 'key'],
  );
}
