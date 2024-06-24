import { DB } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

const supabaseAdmin = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { candResponse, application_id } = req.body;
    if (!candResponse)
      return res.status(400).send('missing candResponse in payload');
    if (!application_id)
      return res.status(400).send('missing application_id in payload');

    supabaseWrap(
      await supabaseAdmin.from('screening_answers').insert({
        screening_id: application_id,
        answers: candResponse as any,
      }),
    );

    return res.status(200).send('sucess');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default handler;
