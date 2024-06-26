import { createClient } from '@supabase/supabase-js';
import type { DB } from '@aglint/shared-types';

export const supabaseAdmin = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsaW9ucGZtZ3Zlbm1kd3dqemFjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODY1ODE4MywiZXhwIjoyMDE0MjM0MTgzfQ.mSmvcr8K9STsaMCuMwbtdA9uwa7RIrRVs1KPzD2Inws',
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
    if (recs.length === 0) throw new Error('No records found');
  }
  return data;
};
