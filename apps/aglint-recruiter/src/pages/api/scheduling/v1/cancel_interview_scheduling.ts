import dayjs from 'dayjs';

var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
import { ApiCancelScheduledInterview } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { session_ids } = req.body as ApiCancelScheduledInterview;
  if (!session_ids) return res.status(400).send('missing fields');
  try {
    const meeting_ids = supabaseWrap(
      await supabaseAdmin
        .from('interview_session')
        .select('meeting_id')
        .in('id', session_ids),
    );
    const meetings = supabaseWrap(
      await supabaseAdmin
        .from('interview_meeting')
        .update({
          status: 'cancelled',
        })
        .in(
          'id',
          meeting_ids.map((i) => i.meeting_id),
        )
        .select(),
    );

    if (meetings.length === 0) return res.status(200).send('no meetings found');
    const promises = meetings.map(async (meeting) => {
      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v1/cancel_calender_event`,
        { calender_event: meeting.meeting_json },
      );
    });
    await Promise.all(promises);

    return res.status(200).send('ok');
  } catch (error) {
    console.error(error.message);
    return res.status(500).send(error.message);
  }
};

export default handler;
