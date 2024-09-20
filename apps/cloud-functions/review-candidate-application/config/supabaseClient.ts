require('dotenv').config();
import { createClient } from '@supabase/supabase-js';
import { SupabaseError } from '../utils/CustomError';
import { Database } from '../schema/db/schema';
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_KEY || ''
);

export const supabaseWrap = ({ data, error }: any) => {
  if (error) throw new SupabaseError(error.message);
  return data;
};
