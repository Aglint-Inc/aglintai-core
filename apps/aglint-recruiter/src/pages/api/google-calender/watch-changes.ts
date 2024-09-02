import { type NextApiRequest, type NextApiResponse } from 'next';

import { GoogleCalender } from '@/src/services/GoogleCalender/google-calender';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { user_id } = req.body;
    const google_cal = new GoogleCalender(null, null, user_id);
    await google_cal.authorizeUser();
    const resp = await google_cal.watchEvents(user_id);
    await updateUser({
      channelId: resp.id,
      resourceId: resp.resourceId,
      user_id,
    });
    return res.status(200).json(resp);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
export default handler;

const updateUser = async ({
  user_id,
  resourceId,
  channelId,
}: {
  user_id: string;
  resourceId: string;
  channelId: string;
}) => {
  await supabaseAdmin
    .from('recruiter_user')
    .update({
      calendar_sync: {
        resourceId,
        channelId,
      },
    })
    .eq('user_id', user_id)
    .throwOnError();
};
