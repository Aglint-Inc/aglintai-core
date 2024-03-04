import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { Database } from '@/src/types/schema';

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data, error } = await supabase
      .from('interview_schedule')
      .select(
        '*, interview_module(id, name , recruiter(id,name,logo)),applications(id , candidates(first_name,email))',
      )
      .eq('id', req.body.id);
    if (!error) {
      const { data: rel, error: relErr } = await supabase
        .from('interview_module_relation')
        .select('*')
        .eq('panel_id', data[0].panel_id);

      if (!relErr) {
        const { data: relUser, error: userErr } = await supabase
          .from('recruiter_user')
          .select('user_id,first_name,profile_image')
          .in(
            'user_id',
            rel.map((r) => r.user_id),
          );
        if (!userErr) {
          return res.status(200).json({ ...data[0], users: relUser });
        }
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export default handler;
