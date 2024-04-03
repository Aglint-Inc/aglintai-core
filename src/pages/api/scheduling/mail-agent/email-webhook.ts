/* eslint-disable no-console */
// pages/api/sendgridWebhook.js

import axios from 'axios';
import formidable from 'formidable';

// import { InterviewModuleDbType } from '@/src/components/JobInterviewPlan/types';
import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import {
  // CandidateType,
  // PublicJobsType,
  ScheduleAgentChatHistoryTypeDB,
} from '@/src/types/data.types';
import { getFullName } from '@/src/utils/jsonResume';

import { supabaseAdmin } from '../../phone-screening/get-application-info';
import { sendEmailFromAgent } from './init-agent';

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
    candidate_time_zone: string | null;
    interv_plan_summary: string;
  };
};

export default async function handler(req, res) {
  const form = formidable({});
  try {
    const [fields] = await form.parse(req);
    const candidate_email = getEmail(fields.from[0]);
    // const to_email = getEmail(fields.to[0]);
    // const subject = fields.subject[0];
    const email_body = fields.text[0];

    // if (!allowed_emails.includes(to_email)) {
    //   return res.status(204).send('');
    // }

    console.log(candidate_email);
    const chats = supabaseWrap(
      await supabaseAdmin
        .from('scheduling-agent-chat-history')
        .select()
        .eq('candidate_email', candidate_email),
    );

    if (chats.length === 0) {
      // this email is not from candidate
      // handle this later
      return res.status(204).send('');
    }

    if (chats.length > 1) {
      // cadidate invited for more than one job handle this
      // return res.status(200).send('');
    }

    const {
      job_id,
      application_id,
      date_range,
      chat_history,
      company_id,
      schedule_id,
      scheduling_progress,
      time_zone,
    } = chats[0] as ScheduleAgentChatHistoryTypeDB;

    const [rec] = supabaseWrap(
      await supabaseAdmin
        .from('interview_schedule')
        .select(
          '*, applications(public_jobs(id,company,job_title,logo,interview_plan,recruiter_id), candidates(email,first_name,last_name))',
        )
        .eq('application_id', application_id),
    );

    const job = rec.applications.public_jobs;
    const interv_plan_summary = getPlanSummary(
      (job.interview_plan as any).plan,
    );

    // const candidate = rec.applications.candidates as Pick<
    //   CandidateType,
    //   'first_name' | 'email' | 'last_name'
    // >;
    const candidate = rec.applications.candidates as any;
    const agent_payload: AgentPayloadType = {
      history: chat_history,
      payload: {
        candidate_email: candidate_email,
        candidate_name: getFullName(candidate.first_name, candidate.last_name),
        company_name: job.company,
        start_date: date_range[0],
        end_date: date_range[1],
        job_role: job.job_title,
        company_logo: job.logo,
        new_cand_msg: email_body,
        company_id,
        job_id,
        schedule_id,
        cand_application_status: scheduling_progress,
        candidate_time_zone: time_zone,
        interv_plan_summary: interv_plan_summary,
        application_id,
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

const getPlanSummary = (job_plan: any) => {
  let plan_summary = ``;

  let cnt = 1;
  for (let session of job_plan) {
    if (session.isBreak) {
      plan_summary += `\nBreak: ${session.duration} minutes\n`;
    } else {
      plan_summary += `Session #${cnt}. ${session.session_name}(${session.meetingIntervCnt} Inteviewers will be present),  Session duraion ${session.duration} minutes ,schedule type ${session.meeting_type.provider_label} \n`;
      cnt++;
    }
  }
  return plan_summary;
};

//candidate status
// reschedule
// handle cases based on candidate application status
// api prev time
// candidate time zone
