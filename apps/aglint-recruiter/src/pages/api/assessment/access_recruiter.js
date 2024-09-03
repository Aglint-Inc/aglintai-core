/* eslint-disable no-console */
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export default async function handler(req, res) {
  const id = req.body.id;
  console.log(id);
  try {
    const { data, error } = await supabase
      .from('recruiter')
      .select()
      .eq('id', id);

    if (!error) {
      return res.status(200).send(data[0]);
    } else {
      return [];
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
}