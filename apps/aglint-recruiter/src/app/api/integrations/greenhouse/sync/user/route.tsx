import { DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { NextRequest } from 'next/server';

import { routeHandlerFactory } from '@/src/utils/apiUtils/responseFactoryPro';

import { getGreenhouseKey } from '../../utils';
import { filterMapUser, getGreenhouseUsers } from './process';
import { GreenhouseUserAPI } from './type';

const decryptKey = process.env.ENCRYPTION_KEY!;
if (!decryptKey) {
  throw new Error('ENCRYPTION_KEY is not defined');
}

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export function GET(request: NextRequest) {
  const method = routeHandlerFactory<GreenhouseUserAPI>('GET', request);
  return method(async ({ requesterDetails }) => {
    const { recruiter_id, user_id } = requesterDetails;
    const key = await getGreenhouseKey(supabase, recruiter_id);
    const users = await getGreenhouseUsers(key);
    const filteredUsers = await filterMapUser(
      supabase,
      users,
      recruiter_id,
      user_id,
    );
    return filteredUsers;
  }, []);
}
