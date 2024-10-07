import { type NextApiRequest, type NextApiResponse } from 'next';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

export const getInterviewersRelationsApi = async (session_ids: string[]) => {
  const supabaseAdmin = getSupabaseServer();
  return (
    await supabaseAdmin
      .from('interview_session_relation')
      .select(
        'session_id, feedback, interview_module_relation(id,user_id,recruiter_user(user_id,email,first_name,last_name,profile_image,position))',
      )
      .eq('is_confirmed', true)
      .in('session_id', session_ids)
      .throwOnError()
  ).data!;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { session_ids } = req.body;

  if (!Array.isArray(session_ids)) {
    return res
      .status(400)
      .json({ error: 'Invalid input: session_ids must be an array' });
  }

  try {
    const data = await getInterviewersRelationsApi(session_ids);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
