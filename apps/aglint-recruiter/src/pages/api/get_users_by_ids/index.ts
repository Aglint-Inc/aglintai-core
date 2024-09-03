import { type DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { type NextApiRequest, type NextApiResponse } from 'next';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export type ApiBodyGetUsersByIds = { rec_id: string };
export type ApiResponseGetUsersByIds = Awaited<
  ReturnType<typeof getUsersByIds>
>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const { rec_id } = req.body as ApiBodyGetUsersByIds;
      if (!rec_id) {
        return res
          .status(400)
          .send({ error: 'Invalid request. Required props missing.' });
      }
      const data: ApiResponseGetUsersByIds = await getUsersByIds(rec_id);
      return res.status(200).send(data);
    } catch (error) {
      return res.status(200).send({
        error: error || 'Internal Server Error.',
      });
    }
  }
}

const getUsersByIds = async (rec_id: string) => {
  return (
    await supabase
      .from('recruiter_relation')
      .select(
        'recruiter_user!public_recruiter_relation_user_id_fkey(user_id, first_name, last_name, profile_image)',
      )
      .eq('recruiter_id', rec_id)
  ).data;
};
