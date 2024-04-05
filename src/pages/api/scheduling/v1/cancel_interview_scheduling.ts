/* eslint-disable no-console */
import dayjs from 'dayjs';

var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
// import { InterviewMeetingTypeDb } from '@/src/types/data.types';
import { SchedulingProgressStatusType } from '@/src/utils/scheduling_v2/mailagent/types';

import { supabaseAdmin } from '../../phone-screening/get-application-info';

export type BookingApiParams = {
  schedule_id: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { schedule_id } = req.body as BookingApiParams;
  if (!schedule_id) return res.status(400).send('missing fields');
  try {
    const meetings = supabaseWrap(
      await supabaseAdmin
        .from('interview_meeting')
        .select()
        .eq('interview_schedule_id', schedule_id),
    ); // as InterviewMeetingTypeDb[];
    if (meetings.length === 0) return res.status(200).send('no meetings found');

    const promises = meetings.map(async (meeting) => {
      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v2/cancel_calender_event`,
        meeting.meeting_json,
      );
    });
    await Promise.all(promises);
    // supabaseWrap(
    //   await supabaseAdmin
    //     .from('interview_schedule')
    //     .update({
    //       status: 'cancelled',
    //     })
    //     .eq('id', schedule_id),
    // );
    let status: SchedulingProgressStatusType = 'cancelled';
    supabaseWrap(
      await supabaseAdmin
        .from('scheduling-agent-chat-history')
        .update({
          scheduling_progress: status,
        })
        .eq('schedule_id', schedule_id),
    );
    return res.status(200).send('ok');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export default handler;
