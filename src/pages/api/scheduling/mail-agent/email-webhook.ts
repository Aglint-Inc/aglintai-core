/* eslint-disable no-console */
// pages/api/sendgridWebhook.js

import axios from 'axios';
import formidable from 'formidable';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import {
  PublicJobsType,
  ScheduleAgentChatHistoryTypeDB,
} from '@/src/types/data.types';
import { getFullName } from '@/src/utils/jsonResume';

import { sendEmailFromAgent } from './init-agent';
import { supabaseAdmin } from '../../phone-screening/get-application-info';

export const config = {
  api: {
    bodyParser: false,
    maxDuration: 25,
  },
};

type AgentPayloadType = {
  history: any[];
  payload: {
    candidate_name: string;
    candidate_email: string;
    company_name: string;
    job_role: string;
    start_date: string;
    end_date: string;
    new_cand_msg: string;
    application_id: string;
    job_id: string;
    company_id: string;
    schedule_id: string;
    company_logo: string;
    cand_application_status: string;
  };
};

const allowed_emails = ['agent@ai.aglinthq.com'];

export default async function handler(req, res) {
  const form = formidable({});
  try {
    const [fields] = await form.parse(req);
    const candidate_email = getEmail(fields.from[0]);
    const to_email = getEmail(fields.to[0]);
    // const subject = fields.subject[0];
    const email_body = fields.text[0];

    if (!allowed_emails.includes(to_email)) {
      return res.status(204).send('');
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
      return res.status(204).send('');
    }

    if (rec.length > 1) {
      // cadidate invited for more than one job handle this
      return res.status(204).send('');
    }

    const {
      job_id,
      application_id,
      date_range,
      chat_history,
      company_id,
      schedule_id,
      scheduling_progress,
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
        cand_application_status: scheduling_progress,
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
    await sendEmailFromAgent({
      candidate_email,
      from_name: job.company,
      mail_body: data.new_history[data.new_history.length - 1].value,
      subject: `Interview for ${job.job_title} - ${candidate.first_name}`,
    });
    return res.status(204).send('');
  } catch (err) {
    console.log(err);
    return res.status(200).send('');
  }
}

const getEmail = (to_string: string) => {
  to_string = to_string.trim();
  return to_string.substring(to_string.indexOf('<') + 1, to_string.length - 1);
};

//candidate status
// reschedule
// handle cases based on candidate application status
// api prev time
// candidate time zone
