import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { Applications } from '@/src/types/applications.types';
import { JobApplcationDB } from '@/src/types/data.types';
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
        .select('candidate_id')
        .eq('id', application_id),
    ) as Applications[];
    if (!app) throw new Error('invalid application');
    const [candidate] = supabaseWrap(
      await supabaseAdmin
        .from('candidates')
        .select()
        .eq('id', app.candidate_id),
    ) as JobApplcationDB[];

    const [answer] = supabaseWrap(
      await supabaseAdmin
        .from("screening_answers")
        .select()
        .eq('screening_id', application_id) 
    )
    return res.status(200).json({ ...app, ...candidate, answer});
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default handler;
