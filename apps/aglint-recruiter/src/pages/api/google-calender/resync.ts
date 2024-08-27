import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { GoogleCalender } from '@/src/services/GoogleCalender/google-calender';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { user_id } = req.body;
    const google_cal = new GoogleCalender(null, null, user_id);
    await google_cal.authorizeUser();
    const user = await getUser(user_id);
    if (user.calendar_sync?.channelId) {
      await google_cal.stopWatch(
        user.calendar_sync.channelId,
        user.calendar_sync.resourceId,
      );
      await updateUser({
        user_id,
      });
    }
    axios.post(
      `${process.env.NEXT_PUBLIC_HOST_NAME}/api/google-calender/watch-changes`,
      {
        user_id: user_id,
      },
    );
    return res.status(200).json('Resynced');
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
export default handler;

const updateUser = async ({ user_id }: { user_id: string }) => {
  await supabaseAdmin
    .from('recruiter_user')
    .update({
      calendar_sync: null,
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
