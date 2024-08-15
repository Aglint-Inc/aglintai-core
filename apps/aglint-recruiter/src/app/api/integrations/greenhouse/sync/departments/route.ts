import { createClient } from '@supabase/supabase-js';
// import axios from 'axios';
import { NextRequest } from 'next/server';

import { routeHandlerFactory } from '@/src/utils/apiUtils/responseFactoryPro';

import { getGreenhouseKey } from '../../utils';
import { getGreenhouseDepartments, mapSaveDepartments } from './process';
import { GreenhouseDepartmentsAPI } from './type';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);
const decryptKey = process.env.ENCRYPTION_KEY!;
if (!decryptKey) {
  throw new Error('ENCRYPTION_KEY is not defined');
}
export function GET(request: NextRequest) {
  const method = routeHandlerFactory<GreenhouseDepartmentsAPI>('GET', request);
  return method(async ({ requesterDetails }) => {
    const { recruiter_id } = requesterDetails;
    const key = await getGreenhouseKey(supabase, recruiter_id);
    const departments = await getGreenhouseDepartments(key);
    const saved = await mapSaveDepartments(supabase, departments, recruiter_id);
    return saved;
  }, []);
}
