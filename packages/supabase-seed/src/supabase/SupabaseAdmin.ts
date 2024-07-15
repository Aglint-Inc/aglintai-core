import {DB} from '@aglint/shared-types';
import {envConfig} from 'src/config';
import {createClient} from '@supabase/supabase-js';
export const supabaseAdmin = createClient<DB>(
  envConfig.SUPABASE_URL,
  envConfig.SUPABASE_SERVICE_KEY
);
