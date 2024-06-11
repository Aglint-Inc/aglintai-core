import {createClient} from '@supabase/supabase-js';
import {envConfig} from '../../config';
import {Database} from '@aglint/shared-types/src/db/schema.types';

export const supabaseAdmin = createClient<Database>(
  envConfig.SUPABASE_URL,
  envConfig.SUPABASE_SERVICE_KEY
);

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const supabaseWrap = <T extends unknown, U extends unknown>(
  {
    data,
    error,
  }: {
    data: T;
    error: U;
  },
  handle_empty_records = true
) => {
  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  if (error) throw error;
  if (handle_empty_records) {
    const recs = data as any;
    if (recs.length === 0) throw new Error('No records found');
  }
  return data;
};
