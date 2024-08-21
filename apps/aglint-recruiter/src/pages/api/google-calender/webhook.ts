import { supabaseWrap } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { NextApiRequest, NextApiResponse } from 'next';

import { GoogleCalender } from '@/src/services/GoogleCalender/google-calender';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const resource_id = req.headers['x-goog-resource-id'];
    const channel_token = req.headers['x-goog-channel-token'];
    const channel_id = req.headers['x-goog-channel-id'] as string;
    const resourceState = req.headers['x-goog-resource-state'];

    if (resourceState === 'sync') {
      return res.status(200).end();
    }
    const [organizer] = supabaseWrap(
      await supabaseAdmin
        .from('recruiter_user')
        .select()
        .eq('user_id', channel_id),
      false,
    );
    if (!organizer) {
      return res.status(200).send('no organizer found');
    }
    const all_meetings = supabaseWrap(
      await supabaseAdmin
        .from('interview_meeting')
        .select()
        .eq('organizer_id', organizer.user_id)
        .eq('status', 'confirmed'),
    );
    const sorted_meetings = all_meetings.sort(
      (m1, m2) =>
        dayjsLocal(m1.start_time).unix() - dayjsLocal(m2.start_time).unix(),
    );
    // const google_cal = new GoogleCalender(null, null, organizer.user_id);
    // await google_cal.authorizeUser();
    // const events = await google_cal.getAllCalenderEvents(
    //   dayjsLocal().toISOString(),
    //   undefined,
    // );
    console.log(sorted_meetings);

    return res.status(200).send('OK');
  } catch (err) {
    ('5f5a5290-030c-496b-9f7c-1f84dc3172a8');
    console.log(err.message);
    return res.status(500).json(err.message);
  }
};
export default handler;
