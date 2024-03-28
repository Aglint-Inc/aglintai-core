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
  getAllIntsFromPlan,
} from '@/src/utils/event_book/book_schedule_plan';

import { supabaseAdmin } from '../../phone-screening/get-application-info';

export type BookingApiParams = {
  plan: InterviewPlanScheduleDbType;
  candidate_email: string;
  schedule_id: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { plan, candidate_email, schedule_id } = req.body as BookingApiParams;

  try {
    if (!plan || !candidate_email || !schedule_id)
      return res.status(400).send('missing fields');
    await saveEventsStatusInSchedule({
      schedule_id,
      api_status: 'started',
      meeting_events: [],
      schedule_plan: plan.plans,
    });

    const { company_cred, recruiters_info, company_id } =
      await getAllIntsFromPlan(plan.plans);

    const promises = plan.plans
      .filter((i) => !i.isBreak)
      .map(async (int_module) => {
        const filt_selected_intervs = int_module.selectedIntervs.filter((u) =>
          recruiters_info.find((r) => r.user_id === u.interv_id),
        );
        const filt_shadow_intervs = int_module.selectedIntervs.filter((u) =>
          recruiters_info.find((r) => r.user_id === u.interv_id),
        );
        const filt_revShadow_intervs = int_module.selectedIntervs.filter((u) =>
          recruiters_info.find((r) => r.user_id === u.interv_id),
        );

        const organizer = filt_selected_intervs[0];
        const attended_inters = [
          ...filt_selected_intervs.slice(1),
          ...filt_shadow_intervs,
          ...filt_revShadow_intervs,
        ];
        const organizer_time_zone =
          (
            recruiters_info.find((r) => r.user_id === organizer.interv_id)
              .scheduling_settings as any
          )?.time_zone?.tzCode || '';
        return await bookIndividualModule({
          candidate_email,
          company_cred,
          end_time: int_module.end_time,
          start_time: int_module.start_time,
          interviewers: attended_inters.map((int) => {
            const rec = recruiters_info.find(
              (r) => r.user_id === int.interv_id,
            );
            return {
              email: int.email,
              schedule_auth: rec?.schedule_auth,
              user_id: int.interv_id,
              time_zone:
                (rec.scheduling_settings as any)?.time_zone?.tzCode || '',
            };
          }),
          organizer: {
            email: organizer.email,
            schedule_auth: recruiters_info.find(
              (r) => r.user_id === organizer.interv_id,
            )?.schedule_auth as any,
            user_id: organizer.interv_id,
            timezone: organizer_time_zone,
          },
          schedule_name: int_module.module_name,
          module_id: int_module.module_id,
          meet_type: int_module.meeting_type,
          company_id,
          duration: int_module.duration,
        });
      });

    const events = await Promise.all(promises);

    await saveEventsStatusInSchedule({
      schedule_id,
      api_status: 'sucess',
      meeting_events: events,
      schedule_plan: plan.plans,
    });
    console.log('log');
    return res.status(200).json(events);
  } catch (error) {
    console.log(error);
    await saveEventsStatusInSchedule({
      api_status: 'failed',
      meeting_events: [],
      schedule_id,
      error_msg: error.message,
      schedule_plan: plan.plans,
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
  schedule_plan,
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
        (e) => e.module_id === int_module.module_id,
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
            meeting_json: meet_event.event,
          })
          .select('id'),
      );

      const meeting_interviewers = [];

      int_module.selectedIntervs.forEach((i) => {
        meeting_interviewers.push({
          interview_meeting_id: rec.id,
          interviewer_id: i.interv_id,
          interviewer_type: 'qualified' as any,
        });
      });
      int_module.shadowIntervs.forEach((i) => {
        meeting_interviewers.push({
          interview_meeting_id: rec.id,
          interviewer_id: i.interv_id,
          interviewer_type: 'shadow' as any,
        });
      });
      int_module.revShadowIntervs.forEach((i) => {
        meeting_interviewers.push({
          interview_meeting_id: rec.id,
          interviewer_id: i.interv_id,
          interviewer_type: 'reverse_shadow' as any,
        });
      });

      supabaseWrap(
        await supabaseAdmin
          .from('interview_meeting_user')
          .insert(meeting_interviewers),
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
          error_msg,
        },
      })
      .eq('id', schedule_id),
  );
};
