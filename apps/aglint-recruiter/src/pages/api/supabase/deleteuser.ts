/* eslint-disable no-console */
import { type DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

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
