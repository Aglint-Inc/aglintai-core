import type { DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const env = process.env.NEXT_PUBLIC_HOST_NAME;

export function getSupabaseServer() {
  if (!url) {
    throw new Error(`Missing SUPABASE_URL on ${env}`);
  }
  if (!key) {
    throw new Error(`Missing SUPABASE_SERVICE_ROLE_KEY on ${env}`);
  }
  return createClient<DB>(url, key);
}
export type SupabaseClientType = SupabaseClient<DB>;
