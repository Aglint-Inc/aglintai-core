import { DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';

export const supabaseAdmin = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
);
