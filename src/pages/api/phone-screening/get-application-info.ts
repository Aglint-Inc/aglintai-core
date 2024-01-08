import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { Applications } from '@/src/types/applications.types';
import { Database } from '@/src/types/schema';

export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { application_id } = req.body;
    if (!application_id)
      return res.status(400).send('missing application_id in payload');

    const [app] = supabaseWrap(
      await supabaseAdmin
        .from('applications')
        .select('phone_screening')
        .eq('id', application_id),
    ) as Applications[];
    return res.status(200).json(app);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default handler;
