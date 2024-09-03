/* eslint-disable no-console */
import { supabaseWrap } from '@aglint/shared-utils';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body.action_id) {
    return res.status(400).send('invalid action_id');
  }
  try {
    supabaseWrap(
      await supabaseAdmin.rpc('run_workflow_action', {
        action_id: req.body.action_id,
      }),
    );
    return res.status(200).send('OK');
  } catch (error) {
    console.error('error', error.message);

    return res.status(500).send(error.message);
  }
};

export default handler;
