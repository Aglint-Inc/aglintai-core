import { createClient } from '@supabase/supabase-js';

import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();
const jd_to_json = process.env.jd_to_json_v1;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables are required.'
  );
}
if (!OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY environment variables are required.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

// export const retryCall = (job_id: string, retry: number) => {
//   if (retry > 0 && job_id) {
//     fetch(jd_to_json, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         job_id,
//         job_title,
//         job_description,
//         skills,
//         retry: retry === 1 ? undefined : retry - 1,
//       }),
//     });
//   }
// };
