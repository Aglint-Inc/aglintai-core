// import axios from 'axios';
import { NextRequest } from 'next/server';

import { routeHandlerFactory } from '@/src/utils/apiUtils/responseFactoryPro';

import { getDecryptKey } from '../util';
import { syncUsers } from './process';
import { GreenHouseUserSyncAPI } from './type';

export function POST(request: NextRequest) {
  const method = routeHandlerFactory<GreenHouseUserSyncAPI>('POST', request);
  return method(
    async ({ body }) => {
      const { recruiter_id, key, last_sync } = body;
      const decryptKey = await getDecryptKey(key);
      await syncUsers(recruiter_id, decryptKey, last_sync);
      return { success: true };
    },
    ['recruiter_id', 'key'],
  );
}
