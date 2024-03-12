/* eslint-disable no-console */
import dayjs from 'dayjs';

var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
import { NextApiRequest, NextApiResponse } from 'next';

import { InterviewPlanScheduleDbType } from '@/src/components/JobInterviewPlan/types';
import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import {
  bookIndividualModule,
  getAllIntsFromPlan
} from '@/src/utils/event_book/book_schedule_plan';

import { supabaseAdmin } from '../../phone-screening/get-application-info';

type BodyParams = {
  plan: InterviewPlanScheduleDbType;
  candidate_email: string;
  schedule_id: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { plan, candidate_email, schedule_id } = req.body as BodyParams;
  console.log(plan, candidate_email, schedule_id);

  try {
    if (!plan || !candidate_email || !schedule_id)
      return res.status(400).send('missing fields');
    await saveEventsStatusInSchedule({
      schedule_id,
      api_status: 'started',
      meeting_events: []
    });
    const { company_cred, recruiters_info } = await getAllIntsFromPlan(
      plan.plan
    );
    const promises = plan.plan
      .filter((i) => !i.isBreak)
      .map(async (int_module) => {
        const organizer = int_module.attended_inters[0];
        const interviewers = int_module.attended_inters.slice(1);

        return await bookIndividualModule({
          candidate_email,
          company_cred,
          end_time: int_module.end_time,
          start_time: int_module.start_time,
          interviewers: interviewers.map((int) => ({
            email: int.email,
            schedule_auth: recruiters_info.find((r) => r.user_id === int.id)
              ?.schedule_auth as any,
            user_id: int.id
          })),
          organizer: {
            email: organizer.email,
            schedule_auth: recruiters_info.find(
              (r) => r.user_id === organizer.id
            )?.schedule_auth as any,
            user_id: organizer.id
          },
          schedule_name: int_module.module_name
        });
      });

    const events = await Promise.all(promises);
    await saveEventsStatusInSchedule({
      schedule_id,
      api_status: 'sucess',
      meeting_events: events
    });
    return res.status(200).json(events);
  } catch (error) {
    await saveEventsStatusInSchedule({
      api_status: 'failed',
      meeting_events: [],
      schedule_id,
      error_msg: error.message
    });
    return res.status(500).send(error.message);
  }
};

export default handler;

const saveEventsStatusInSchedule = async ({
  api_status,
  meeting_events,
  schedule_id,
  error_msg = null
}: {
  schedule_id: string;
  api_status: 'sucess' | 'started' | 'not_started' | 'failed';
  meeting_events: any[];
  error_msg?: string | null;
}) => {
  supabaseWrap(
    await supabaseAdmin
      .from('interview_schedule')
      .update({
        meeting_json: meeting_events,
        calender_event_api_status: {
          api_status,
          error_msg
        }
      })
      .eq('id', schedule_id)
  );
};
