
/* eslint-disable no-console */
import dayjs from 'dayjs';
import { has } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';

import { supabaseAdmin } from '../../fetchCompanyDetails';

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
    const meeting_users = supabaseWrap(
      await supabaseAdmin
        .from('meeting_interviewers')
        .select('*')
        .in('session_id', req_body.session_ids),
    );

    const meetings = meeting_details
      .map((m) => {
        return {
          ...m,
          meeting_users: meeting_users.filter(
            (u) => u.session_id === m.session_id,
          ),
        };
      })
      .sort((m1, m2) => m1.session_order - m2.session_order);

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
