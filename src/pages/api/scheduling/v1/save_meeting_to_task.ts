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

    const session_details = supabaseWrap(
      await supabaseAdmin
        .from('interview_session')
        .select('*,interview_meeting(*)')
        .in('id', req_body.session_ids),
    );

    supabaseWrap(
      await supabaseAdmin
        .from('new_tasks')
        .update({
          session_ids: session_details,
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
