import {createClient} from '@supabase/supabase-js';
import {Database} from '../../types/aglint_types/schema';
import {envConfig} from '../../config';

export const supabaseAdmin = createClient<Database>(
  envConfig.SUPABASE_URL,
  envConfig.SUPABASE_SERVICE_KEY
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
