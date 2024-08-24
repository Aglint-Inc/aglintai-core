import { NextApiRequest, NextApiResponse } from 'next';

import { GoogleCalender } from '@/src/services/GoogleCalender/google-calender';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { user_id } = req.body;
    const google_cal = new GoogleCalender(null, null, user_id);
    await google_cal.authorizeUser();
    const user = await getUser(user_id);
    const resp = await google_cal.stopWatch(
      user.calendar_sync.channelId,
      user.calendar_sync.resourceId,
    );
    await updateUser({
      user_id,
      syncToken: user.calendar_sync.syncToken,
    });
    return res.status(200).json(resp);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
export default handler;

const updateUser = async ({
  user_id,
  syncToken,
}: {
  user_id: string;
  syncToken: string;
}) => {
  await supabaseAdmin
    .from('recruiter_user')
    .update({
      calendar_sync: {
        syncToken: syncToken,
        resourceId: null,
        channelId: null,
      },
    })
    .eq('user_id', user_id)
    .throwOnError();
};

const getUser = async (user_id: string) => {
  const user = (
    await supabaseAdmin
      .from('recruiter_user')
      .select('calendar_sync')
      .eq('user_id', user_id)
      .single()
      .throwOnError()
  ).data;

  return user;
};
