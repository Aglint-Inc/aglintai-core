import { DB } from '@aglint/shared-types';
import { createServerClient } from '@supabase/ssr';

export function createClient(
  options: Parameters<typeof createServerClient>[2],
) {
  return createServerClient<DB>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    options,
  );
}
