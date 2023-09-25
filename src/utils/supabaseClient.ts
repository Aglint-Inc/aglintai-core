import { createClient } from '@supabase/supabase-js';
// @ts-ignore
import { Database } from '@types/schema';
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY
);
