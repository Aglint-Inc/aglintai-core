import { createClient } from '@supabase/supabase-js';
import { Database } from '@aglint/shared-types/src/db/schema.types';

export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const supabaseWrap = <T extends unknown, U extends unknown>({
  data,
  error,
}: {
  data: T;
  error: U;
}) => {
  if (error) throw error;
  return data;
};
