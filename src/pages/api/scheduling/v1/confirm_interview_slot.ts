/* eslint-disable no-console */
import axios from 'axios';
import dayjs from 'dayjs';
import { has } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import {
  bookCandidatePlan,
  saveEventsStatusInSchedule,
} from '@/src/utils/event_book/book_day_plan';
import { BookingTimeFormat } from '@/src/utils/integrations/constants';

import { supabaseAdmin } from '../../phone-screening/get-application-info';
import { getCandidateLogger } from './getCandidateLogger';

var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);

export type ConfirmApiBodyParams = {
  candidate_plan: {
    sessions: {
      session_id: string;
      start_time: string;
      end_time: string;
    }[];
  }[];
  recruiter_id: string;
  user_tz: string;
  candidate_email: string;
  schedule_id: string;
  filter_id?: string;
  task_id: string | null;
  agent_type: 'email' | 'phone' | 'self';
  candidate_name: string;
  candidate_id: string;
};

const required_fields = [
  'candidate_plan',
  'recruiter_id',
  'user_tz',
  'candidate_email',
  'schedule_id',
];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const req_body = req.body as ConfirmApiBodyParams;
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
      axios.post('/api/scheduling/application/mailthankyou', {
        filter_id: req_body.filter_id,
      });
    }

    if (
      req_body.task_id &&
      req_body.candidate_id &&
      req_body.candidate_email &&
      req_body.candidate_name &&
      req_body.agent_type
    ) {
      const candLogger = getCandidateLogger(
        req_body.task_id,
        req_body.candidate_name,
        req_body.agent_type,
        req_body.candidate_id,
      );
      await candLogger(
        `Scheduled interview sucessfully on ${dayjs(
          req_body.candidate_plan[0].sessions[0].start_time,
        )
          .tz(req_body.user_tz)
          .format(BookingTimeFormat)}`,
        'interview_schedule',
      );
      supabaseWrap(
        await supabaseAdmin
          .from('new_tasks')
          .update({
            status: 'completed',
          })
          .eq('id', req_body.task_id),
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
