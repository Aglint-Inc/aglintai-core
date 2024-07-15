import {DB} from '@aglint/shared-types';
import {envConfig} from 'src/config';
import {createClient} from '@supabase/supabase-js';
const supabase = createClient<DB>(
  envConfig.SUPABASE_URL,
  envConfig.SUPABASE_SERVICE_KEY
);
export const supabaseAdmin = supabase;
