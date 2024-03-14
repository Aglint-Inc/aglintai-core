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

export type BookingApiParams = {
  plan: InterviewPlanScheduleDbType;
  candidate_email: string;
  schedule_id: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { plan, candidate_email, schedule_id } = req.body as BookingApiParams;
  console.log(plan, candidate_email, schedule_id);

  try {
    if (!plan || !candidate_email || !schedule_id)
      return res.status(400).send('missing fields');

    await saveEventsStatusInSchedule({
      schedule_id,
      api_status: 'started',
      meeting_events: [],
      schedule_plan: plan.plans
    });

    const { company_cred, recruiters_info } = await getAllIntsFromPlan(
      plan.plans
    );

    const promises = plan.plans
      .filter((i) => !i.isBreak)
      .map(async (int_module) => {
        const organizer = int_module.selectedIntervs[0];
        const interviewers = int_module.selectedIntervs.slice(1);

        return await bookIndividualModule({
          candidate_email,
          company_cred,
          end_time: int_module.end_time,
          start_time: int_module.start_time,
          interviewers: interviewers.map((int) => ({
            email: int.email,
            schedule_auth: recruiters_info.find(
              (r) => r.user_id === int.interv_id
            )?.schedule_auth as any,
            user_id: int.interv_id
          })),
          organizer: {
            email: organizer.email,
            schedule_auth: recruiters_info.find(
              (r) => r.user_id === organizer.interv_id
            )?.schedule_auth as any,
            user_id: organizer.interv_id
          },
          schedule_name: int_module.module_name,
          module_id: int_module.module_id
        });
      });

    const events = await Promise.all(promises);
    console.log('nfkewjn');

    await saveEventsStatusInSchedule({
      schedule_id,
      api_status: 'sucess',
      meeting_events: events,
      schedule_plan: plan.plans
    });
    console.log('nfkewjn');

    return res.status(200).json(events);
  } catch (error) {
    await saveEventsStatusInSchedule({
      api_status: 'failed',
      meeting_events: [],
      schedule_id,
      error_msg: error.message,
      schedule_plan: plan.plans
    });
    return res.status(500).send(error.message);
  }
};

export default handler;

const saveEventsStatusInSchedule = async ({
  api_status,
  meeting_events = [],
  schedule_id,
  error_msg = null,
  schedule_plan
}: {
  schedule_id: string;
  api_status: 'sucess' | 'started' | 'not_started' | 'failed';
  meeting_events: any[];
  error_msg?: string | null;
  schedule_plan: InterviewPlanScheduleDbType['plans'];
}) => {
  if (meeting_events.length > 0) {
    const promises = schedule_plan.map(async (int_module, idx) => {
      if (int_module.isBreak) return;

      const meet_event = meeting_events.find(
        (e) => e.module_id === int_module.module_id
      );

      let break_duration = 0;
      if (idx < schedule_plan.length - 1 && schedule_plan[idx + 1].isBreak) {
        break_duration = schedule_plan[idx + 1].duration;
      }

      const [rec] = supabaseWrap(
        await supabaseAdmin
          .from('interview_meeting')
          .insert({
            module_id: int_module.module_id,
            duration: int_module.duration,
            start_time: int_module.start_time,
            end_time: int_module.end_time,
            interview_schedule_id: schedule_id,
            break_time: break_duration,
            meeting_json: meet_event.event
          })
          .select('id')
      );

      const meeting_interviewers = int_module.selectedIntervs.map((i) => ({
        interview_meeting_id: rec.id,
        interviewer_id: i.interv_id,
        interviewer_type: 'qualified' as any
      }));

      supabaseWrap(
        await supabaseAdmin
          .from('interview_meeting_user')
          .insert(meeting_interviewers)
      );
    });

    await Promise.all(promises);
  }

  supabaseWrap(
    await supabaseAdmin
      .from('interview_schedule')
      .update({
        calender_event_api_status: {
          api_status,
          error_msg
        }
      })
      .eq('id', schedule_id)
  );
};
