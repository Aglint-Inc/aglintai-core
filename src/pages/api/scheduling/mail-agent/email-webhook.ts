/* eslint-disable no-console */
// pages/api/sendgridWebhook.js

import axios from 'axios';
import formidable from 'formidable';

// import { InterviewModuleDbType } from '@/src/components/JobInterviewPlan/types';
import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { EmailAgentId } from '@/src/components/Tasks/utils';
import {
  CandidateType,
  InterviewFilterJsonType,
  InterviewScheduleTypeDB,
  InterviewSession,
  JobApplcationDB,
  PublicJobsType,
  RecruiterType,
  // CandidateType,
  // PublicJobsType,
  ScheduleAgentChatHistoryTypeDB,
} from '@/src/types/data.types';
import { getFullName } from '@/src/utils/jsonResume';
import { log_task_progress } from '@/src/utils/scheduling_v2/utils';

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
    interview_sessions: InterviewSession[];
    sub_task_id: string;
    candidate_id: string;
  };
};

export default async function handler(req, res) {
  const form = formidable({});
  try {
    const [fields] = await form.parse(req);
    const candidate_email = getEmail(fields.from[0]);
    // const to_email = getEmail(fields.to[0]);
    // const subject = fields.subject[0];
    const raw_email_body: string = fields.text[0];

    //clean incoming email body
    const cleaned_email_body = raw_email_body
      .split('\r\n')
      .filter((s) => !(s.includes('>') || s.endsWith('wrote:')))
      .filter((s) => s.length > 0)
      .join('\r\n');

    const agent_payload = await fetchCandidateDetails(
      candidate_email,
      cleaned_email_body,
    );

    await log_task_progress({
      log_msg: 'Candidate Agent chat',
      sub_task_id: agent_payload.payload.sub_task_id,
      transcript: { message: cleaned_email_body },
      created_by: {
        id: agent_payload.payload.candidate_id,
        name: agent_payload.payload.candidate_name,
      },
      progress_type: 'email_messages',
    });

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
        .eq('candidate_email', candidate_email),
    );

    await log_task_progress({
      log_msg: 'Candidate Agent chat',
      sub_task_id: agent_payload.payload.sub_task_id,
      transcript: {
        message: data.new_history[data.new_history.length - 1]?.content,
      },
      created_by: {
        id: EmailAgentId,
        name: `Email Agent`,
      },
      progress_type: 'email_messages',
    });

    await sendEmailFromAgent({
      candidate_email,
      from_name: agent_payload.payload.company_name,
      mail_body: data.new_history[data.new_history.length - 1].value,
      subject: `Interview for ${agent_payload.payload.job_role} - ${agent_payload.payload.candidate_name}`,
    });
    return res.status(204).send('');
  } catch (err) {
    console.log(err);
    return res.status(500).send('');
  }
}

const getEmail = (to_string: string) => {
  to_string = to_string.trim();
  return to_string.substring(to_string.indexOf('<') + 1, to_string.length - 1);
};

export const fetchCandidateDetails = async (
  cand_email: string,
  cand_email_body: string,
) => {
  const [cand_rec] = supabaseWrap(
    await supabaseAdmin
      .from('scheduling-agent-chat-history')
      .select(
        '*, interview_filter_json(* ,interview_schedule(id,application_id, applications(*,public_jobs(id,recruiter_id,logo,job_title,company,recruiter(scheduling_settings)), candidates(*))))',
      )
      .eq('candidate_email', cand_email),
  ) as CandidateScheduleDetails[];

  if (!cand_rec) {
    // this email is not from candidate
    // handle this later
    return null;
  }

  const job =
    cand_rec.interview_filter_json.interview_schedule.applications.public_jobs;
  const candidate =
    cand_rec.interview_filter_json.interview_schedule.applications.candidates;

  const filter_json = cand_rec.interview_filter_json.filter_json as unknown as {
    user_tz: string;
    end_date: string;
    start_date: string;
    session_ids: string[];
    recruiter_id: string;
  };

  const sessions = supabaseWrap(
    await supabaseAdmin
      .from('interview_session')
      .select()
      .in('id', filter_json.session_ids),
  );
  let plan_summary = '';
  sessions.forEach((sess, idx) => {
    if (sess.session_type === 'debrief') return;
    plan_summary +=
      `Session ${idx + 1}. ${sess.name}\n` +
      `- Duration ${sess.session_duration} ` +
      `- meeting place ${sess.schedule_type} ` +
      `- meeting break ${sess.break_duration} \n\n`;
  });
  const agent_payload: AgentPayloadType = {
    history: cand_rec.chat_history,
    payload: {
      candidate_email: cand_rec.candidate_email,
      candidate_name: getFullName(candidate.first_name, candidate.last_name),
      company_name: job.company,
      start_date: filter_json.start_date,
      end_date: filter_json.end_date,
      job_role: job.job_title,
      company_logo: job.logo,
      company_id: job.recruiter_id,
      job_id: job.id,
      schedule_id: cand_rec.interview_filter_json.schedule_id,
      cand_application_status: cand_rec.scheduling_progress,
      candidate_time_zone: filter_json.user_tz,
      interv_plan_summary: plan_summary,
      application_id: cand_rec.application_id,
      new_cand_msg: cand_email_body,
      interview_sessions: sessions.filter((s) => s.session_type !== 'debrief'),
      sub_task_id: cand_rec.sub_task_id,
      candidate_id:
        cand_rec.interview_filter_json.interview_schedule.applications
          .candidates.id,
    },
  };

  return agent_payload;
};

type CandidateScheduleDetails = ScheduleAgentChatHistoryTypeDB & {
  interview_filter_json: InterviewFilterJsonType & {
    interview_schedule: Pick<
      InterviewScheduleTypeDB,
      'id' | 'application_id'
    > & {
      applications: Pick<JobApplcationDB, 'id'> & {
        candidates: Pick<
          CandidateType,
          'first_name' | 'last_name' | 'email' | 'id'
        >;
        public_jobs: Pick<
          PublicJobsType,
          'recruiter_id' | 'company' | 'id' | 'logo' | 'job_title'
        > & {
          recruiter: Pick<RecruiterType, 'scheduling_settings'>;
        };
      };
    };
  };
};
