/* eslint-disable no-console */
import {
  APICandidateConfirmSlot,
  APICandScheduleMailThankYou,
} from '@aglint/shared-types';
import axios from 'axios';
import dayjs from 'dayjs';
import { has } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import {
  bookCandidatePlan,
  saveEventsStatusInSchedule,
} from '@/src/utils/event_book/book_day_plan';
import { agent_activities } from '@/src/utils/scheduling_v2/agents_activity';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

import { getCandidateLogger } from '../../../../utils/scheduling_v2/getCandidateLogger';

var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);

const required_fields = [
  'candidate_plan',
  'recruiter_id',
  'user_tz',
  'candidate_email',
  'schedule_id',
];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const req_body = req.body as APICandidateConfirmSlot;
  try {
    required_fields.forEach((field) => {
      if (!has(req_body, field)) {
        throw new Error(`missing Field ${field}`);
      }
    });

    await bookCandidatePlan(req_body);

    await saveEventsStatusInSchedule({
      api_status: 'sucess',
      schedule_id: req_body.schedule_id,
    });

    if (req_body.filter_id) {
      const payload: APICandScheduleMailThankYou = {
        cand_tz: req_body.user_tz,
        filter_id: req_body.filter_id,
      };
      axios.post(
        `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/application/mailthankyou`,
        payload,
      );
    }

    const session_ids: string[] = req_body.candidate_plan.reduce(
      (s_ids, curr) => {
        s_ids = [...s_ids, ...curr.sessions.map((s) => s.session_id)];
        return s_ids;
      },
      [],
    );

    for (let session_id of session_ids) {
      try {
        axios.post(
          `${process.env.NEXT_PUBLIC_AGENT_API}/api/slack/notify-interview-confirmation`,
          {
            session_id,
          },
        );
      } catch {
        //
      }
    }

    // save snapshot of interview meeting details to tasks
    if (req_body.task_id) {
      axios.post(
        `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v1/save_meeting_to_task`,
        {
          session_ids: session_ids,
          task_id: req_body.task_id,
        },
      );
    }

    if (
      req_body.task_id &&
      req_body.candidate_id &&
      req_body.candidate_email &&
      req_body.candidate_name &&
      req_body.agent_type
    ) {
      session_ids.forEach((s) => {
        axios.post(
          `https://apis-ta7r36xoza-wl.a.run.app/api/slack/notify-interview-confirmation`,
          {
            session_id: s,
          },
        );
      });
      const agent_type =
        req_body.agent_type === 'phone' ? 'phone_agent' : 'email_agent';
      const candLogger = getCandidateLogger(
        req_body.task_id,
        req_body.candidate_name,
        req_body.candidate_id,
        agent_type,
      );
      await candLogger(
        agent_activities['email_agent'].tools['book-interview-slot']
          .scheduled_sucess,
        {
          '{candidate}': req_body.candidate_name,
          '{time_format}': dayjs(
            req_body.candidate_plan[0].sessions[0].start_time,
          )
            .tz(req_body.user_tz)
            .toISOString(),
        },
        agent_type,
        'interview_schedule',
      );
      supabaseWrap(
        await supabaseAdmin
          .from('new_tasks')
          .update({
            status: 'completed',
          })
          .eq('id', req_body.task_id)
          .select(),
      );
    }

    return res.status(200).json('sucess');
  } catch (error) {
    console.log(error);
    await saveEventsStatusInSchedule({
      api_status: 'failed',
      schedule_id: req_body.schedule_id,
      error_msg: error.message,
    });
    return res.status(500).send(error.message);
  }
};

export default handler;

// how many slots exist for for the candidate requested time
