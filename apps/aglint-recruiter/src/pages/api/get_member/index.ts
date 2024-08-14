import { DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export type ApiBodyGetMember = { user_id: string };
export type ApiResponseGetMember = Awaited<
  ReturnType<typeof getInterviewerDetails>
>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const { user_id } = req.body as ApiBodyGetMember;
      if (!user_id) {
        return res
          .status(400)
          .send({ error: 'Invalid request. Required props missing.' });
      }
      const data = await getInterviewerDetails(user_id);
      return res.status(200).send(data);
    } catch (error) {
      return res.status(200).send({
        error: error || 'Internal Server Error.',
      });
    }
  }
}

const getInterviewerDetails = async (user_id: string) => {
  return (
    await supabase
      .from('recruiter_user')
      .select(
        '*,recruiter_relation!public_recruiter_relation_user_id_fkey(created_by,manager_id,roles(name,id)),office_locations(*),departments(*)',
      )
      .eq('user_id', user_id)
      .single()
  ).data;
};
