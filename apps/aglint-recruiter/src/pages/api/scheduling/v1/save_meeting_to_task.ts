/* eslint-disable no-console */
import dayjs from 'dayjs';
import { has } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);

export type ConfirmApiBodyParams = {
  session_ids: string[];
  task_id: string;
};

const required_fields = ['session_ids', 'task_id'];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const req_body = req.body as ConfirmApiBodyParams;
  try {
    required_fields.forEach((field) => {
      if (!has(req_body, field)) {
        throw new Error(`missing Field ${field}`);
      }
    });

    const meeting_details = supabaseWrap(
      await supabaseAdmin
        .from('meeting_details')
        .select(
          'id,session_name,start_time,end_time,meeting_link,session_id,session_order',
        )
        .in('session_id', req_body.session_ids),
    );
    let meeting_users = supabaseWrap(
      await supabaseAdmin
        .from('meeting_interviewers')
        .select('*')
        .in('session_id', req_body.session_ids),
    );

    const meetings = meeting_details
      .sort((m1, m2) => m1.session_order - m2.session_order)
      .map((m) => {
        return {
          id: m.session_id,
          name: m.session_name,
          interview_meeting: {
            id: m.id,
            start_time: m.start_time,
            end_time: m.end_time,
            meeting_link: m.meeting_link,
          },
          session_order: m.session_order,
          users: meeting_users.filter(
            (u) => u.session_id === m.session_id && u.is_confirmed,
          ),
        };
      });

    supabaseWrap(
      await supabaseAdmin
        .from('new_tasks')
        .update({
          session_ids: meetings,
        })
        .eq('id', req_body.task_id),
    );

    return res.status(200).json('sucess');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export default handler;

// how many slots exist for for the candidate requested time
