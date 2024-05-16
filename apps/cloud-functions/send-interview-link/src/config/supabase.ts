import { createClient } from '@supabase/supabase-js';
import { Database } from '../schema/db/db.types';
require('dotenv').config();

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_KEY || ''
);

export class SupabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SupabaseError';
  }
}

export const supabaseWrap = ({ data, error }: any) => {
  if (error) throw new SupabaseError(error);
  return data;
};
