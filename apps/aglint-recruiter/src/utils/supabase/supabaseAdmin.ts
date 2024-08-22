import { DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key =
  process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const env = process.env.NEXT_PUBLIC_HOST_NAME!;
if (!url) {
  throw new Error(`Missing SUPABASE_URL on ${env}`);
}
if (!key) {
  throw new Error(
    `Missing SUPABASE_SERVICE_KEY on ${env}, ${JSON.stringify(process.env)}`,
  );
}
export const supabaseAdmin = createClient<DB>(url, key);
