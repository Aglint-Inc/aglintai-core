/* eslint-disable no-console */
import dayjs from 'dayjs';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import {
  PublicJobsType,
  ScheduleAgentChatHistoryTypeDB,
} from '@/src/types/data.types';
import { getFullName } from '@/src/utils/jsonResume';

export type BodyParams = {
  candidate_email: string;
  email_body: string;
};

//this is the webhook it should handle
// req body includes candidate email, and candidate email_body
// responsiblilities
// should handle multiple email
// whether email exist ?
// fetching candidate chat history using email and job_title and invoke the agent api wait for the response and after getting response send email to the candidate
//
//
//

type AgentPayloadType = {
  history: any[];
  payload: {
    candidate_name;
    candidate_email;
    company_name;
    job_role;
    start_date;
    end_date;
    new_cand_msg;
    application_id;
    job_id;
    company_id;
    schedule_id;
    company_logo;
  };
};
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { candidate_email, email_body } = req.body as BodyParams;

    if (!candidate_email || !email_body) {
      return res.status(400).send('Missing Fields');
    }

    const rec = supabaseWrap(
      await supabaseAdmin
        .from('scheduling-agent-chat-history')
        .select()
        .eq('candidate_email', candidate_email),
    );
    if (rec.length === 0) {
      // this email is not from candidate
      // handle this later
    }

    if (rec.length > 1) {
      // cadidate invited for more than one job handle this
    }

    const {
      job_id,
      application_id,
      date_range,
      chat_history,
      company_id,
      schedule_id,
    } = rec[0] as ScheduleAgentChatHistoryTypeDB;

    const promises = [
      (async () => {
        const [job] = supabaseWrap(
          await supabaseAdmin
            .from('public_jobs')
            .select('company,job_title,logo')
            .eq('id', job_id),
        ) as PublicJobsType[];
        return job;
      })(),
      (async () => {
        const [cand] = supabaseWrap(
          await supabaseAdmin
            .from('applications')
            .select('candidates(*)')
            .eq('id', application_id),
        );
        return cand.candidates;
      })(),
    ];

    const [job, candidate] = await Promise.all(promises);

    const agent_payload: AgentPayloadType = {
      history: chat_history,
      payload: {
        candidate_email: candidate.email,
        candidate_name: getFullName(candidate.first_name, candidate.last_name),
        company_name: job.company,
        start_date: date_range[0],
        end_date: date_range[1],
        job_role: job.job_title,
        company_logo: job.logo,
        new_cand_msg: email_body,
        application_id,
        company_id,
        job_id,
        schedule_id,
      },
    };

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_AI_HOST}/api/email-agent`,
      {
        ...agent_payload,
      },
    );
    supabaseWrap(
      await supabaseAdmin
        .from('scheduling-agent-chat-history')
        .update({
          chat_history: data.new_history,
        })
        .eq('job_id', job_id)
        .eq('application_id', application_id),
    );

    return res.status(200).send({ history: data.new_history });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export default handler;
