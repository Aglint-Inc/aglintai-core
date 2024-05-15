import { Database } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);
export default async function handler(req, res) {
  const { assessment_id, application_id } = req.body;
  const { data, error } = await supabase
    .from('assessment_results')
    .insert({
      application_id: application_id,
      assessment_id: assessment_id,
    })
    .select();
  if (!error) {
    res.status(200).send(data);
  }
}
