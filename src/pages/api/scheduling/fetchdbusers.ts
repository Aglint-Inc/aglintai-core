import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { Database } from '@/src/types/schema';

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data: usersData, error: usersError } = await supabase
      .from('recruiter_user')
      .select(
        'user_id, first_name, last_name, email, profile_image, position, schedule_auth',
      )
      .in('user_id', req.body.user_ids);

    if (usersError) throw usersError;

    return res.status(200).json(usersData);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export default handler;
