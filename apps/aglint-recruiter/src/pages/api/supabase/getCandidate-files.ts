/* eslint-disable no-console */
import { Database } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  const { id } = req.body;
  console.log(id);
  const { data, error } = await supabase
    .from('candidate_files')
    .select()
    .eq('candidate_id', id);
  if (!error) {
    res.status(200).send(data);
  } else {
    // console.log(error.message);
    res.status(200).send(error.message);
  }
}
