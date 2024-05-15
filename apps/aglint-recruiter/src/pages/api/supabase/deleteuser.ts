/* eslint-disable no-console */
import { Database } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  const { data, error } = await supabase.auth.admin.deleteUser(
    req.body.user_id,
  );
  if (error) {
    console.log(error);
    res.status(400).send(error.message);
  } else {
    console.log(data);
    res.status(200).send('User deleted');
  }
}
