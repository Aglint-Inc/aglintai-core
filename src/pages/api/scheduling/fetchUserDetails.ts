import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { Database } from '@/src/types/schema';

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export interface BodyParamsFetchUserDetails {
  recruiter_id: string;
  status?: 'joined' | 'invited';
}

export type ApiResponseFetchUserDetails = ReturnType<typeof fetchUsers>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { recruiter_id, status = 'joined' } =
      req.body as BodyParamsFetchUserDetails;
    const { data, error } = await supabase
      .from('recruiter_relation')
      .select()
      .eq('recruiter_id', recruiter_id);
    if (!error && data.length) {
      const userIds = data.map((item) => item.user_id);
      const resUsers = await fetchUsers(userIds, status);
      if (resUsers.data) {
        return res.status(200).json(resUsers.data);
      }
    } else {
      return res.status(200).json([]);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export default handler;

const fetchUsers = async (user_ids: string[], status: string) => {
  const { data: users, error: userError } = await supabase
    .from('recruiter_user')
    .select('user_id, first_name, last_name, email, profile_image, position')
    .in('user_id', user_ids)
    .eq('join_status', status);

  return { data: users, error: userError };
};
