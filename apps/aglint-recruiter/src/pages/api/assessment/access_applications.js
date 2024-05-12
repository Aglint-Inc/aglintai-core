/* eslint-disable no-console */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_SERVICE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  const application_id = req.body.application_id;
  console.log(application_id);
  try {
    const { data: application, error: application_error } = await supabase
      .from('applications')
      .select()
      .eq('id', application_id);
    if (!application_error) {
      const { data: result } = await supabase
        .from('assessment_results')
        .select()
        .eq('application_id', application_id);
      return res.status(200).send({ ...application[0], ...result[0] });
    } else {
      return [];
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
}
