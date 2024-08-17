import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

const handler = async (req, res) => {
  await supabaseAdmin.rpc('move_to_interview', req.body).throwOnError();
  return res.status(200).send('OK');
};

export default handler;
