import { type NextRequest } from 'next/server';

import { routeHandlerFactory } from '@/utils/apiUtils/responseFactoryPro';

import { getGreenhouseMeta, setGreenhouseMeta } from './process';
import { type GreenhouseAPI } from './type';

export function GET(request: NextRequest) {
  const method = routeHandlerFactory<GreenhouseAPI['GET']>('GET', request);
  return method(async ({ requesterDetails }) => {
    const { recruiter_id } = requesterDetails;
    const temp = await getGreenhouseMeta(recruiter_id);
    return {
      options: temp.options || {},
      last_sync: temp.last_sync || {},
      key: temp.key,
    };
  });
}

export function POST(request: NextRequest) {
  const method = routeHandlerFactory<GreenhouseAPI['POST']>('POST', request);
  return method(async ({ requesterDetails, body }) => {
    const { recruiter_id } = requesterDetails;
    const temp = await setGreenhouseMeta(recruiter_id, body);
    return { options: temp.options || {}, last_sync: temp.last_sync || {} };
  });
}
