import { createClient } from '@supabase/supabase-js';
import type { DB } from '@aglint/shared-types';

export const supabaseAdmin = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const supabaseWrap = <T extends unknown, U extends unknown>(
  {
    data,
    error,
  }: {
    data: T;
    error: U;
  },
  handle_empty_records = true,
) => {
  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  if (error) throw error;
  if (handle_empty_records) {
    const recs = data as any;
    if (recs && recs.length === 0) throw new Error('No records found');
  }
  return data;
};
