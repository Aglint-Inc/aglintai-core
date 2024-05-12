import { createClient } from '@supabase/supabase-js';

import { Database } from '@/src/types/schema';

export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);
