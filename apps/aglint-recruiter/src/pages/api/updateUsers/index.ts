import { type DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { type NextApiRequest, type NextApiResponse } from 'next';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { user_id, data } = req.body;
    if (user_id) {
      const { data: user } = await supabase
        .from('recruiter_user')
        .update(data)
        .eq('user_id', user_id)
        .select()
        .single();

      return res.send(user);
    } else {
      return res.send([]); // do error handling
    }
  }
  res.setHeader('Allow', 'POST');
  res.status(405).end('Method Not Allowed!');
}
