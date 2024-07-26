/* eslint-disable no-console */
import { supabaseWrap } from '@aglint/shared-utils';
import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('incoming body', req.body);

  try {
    supabaseWrap(await supabaseAdmin.rpc('workflow_action_log_cron'));
    return res.status(200).send('OK');
  } catch (error) {
    console.error('error', error);

    return res.status(500).send(error.message);
  }
};

export default handler;
