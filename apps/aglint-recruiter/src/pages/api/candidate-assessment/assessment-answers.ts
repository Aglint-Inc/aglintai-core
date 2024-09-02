import { type DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);
export default async function handler(req, res) {
  const { assessment_id } = req.body;
  const { data, error } = await supabase
    .from('assessment_question')
    .select('answer')
    .eq('assessment_id', assessment_id);

  if (!error) {
    res.status(200).send(data);
  }
}
