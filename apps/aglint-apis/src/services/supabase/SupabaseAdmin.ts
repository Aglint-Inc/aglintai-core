import {createClient} from '@supabase/supabase-js';
import {envConfig} from '../../config';
import {DB} from '@aglint/shared-types';

export const supabaseAdmin = createClient<DB>(
  envConfig.SUPABASE_URL,
  envConfig.SUPABASE_SERVICE_KEY
);
