import { DB } from '@aglint/shared-types';
import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

export function createPrivateClient(
  options: Parameters<typeof createServerClient>[2],
) {
  return createServerClient<DB>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    options,
  );
}

export function createPublicClient() {
  return createClient<DB>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY,
  );
}
