import { createClient } from '@supabase/supabase-js';
import { NextRequest } from 'next/server';

import { routeHandlerFactory } from '@/src/utils/apiUtils/responseFactoryPro';

import { getGreenhouseMeta, setGreenhouseMeta } from './process';
import { GreenhouseAPI } from './type';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export function GET(request: NextRequest) {
  const method = routeHandlerFactory<GreenhouseAPI['GET']>('GET', request);
  return method(async ({ requesterDetails }) => {
    const { recruiter_id } = requesterDetails;
    return (await getGreenhouseMeta(supabase, recruiter_id)) as Record<
      string,
      boolean
    >;
  });
}

export function POST(request: NextRequest) {
  const method = routeHandlerFactory<GreenhouseAPI['POST']>('POST', request);
  return method(async ({ requesterDetails, body }) => {
    const { recruiter_id } = requesterDetails;
    return (await setGreenhouseMeta(supabase, recruiter_id, body)) as Record<
      string,
      boolean
    >;
  });
}
