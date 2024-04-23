/* eslint-disable no-console */
// pages/api/sendgridWebhook.js

import axios from 'axios';
import dayjs from 'dayjs';
import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';

// import { InterviewModuleDbType } from '@/src/components/JobInterviewPlan/types';
import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { EmailAgentId } from '@/src/components/Tasks/utils';
import {
  CandidateType,
  InterviewFilterJsonType,
  InterviewMeetingTypeDb,
  InterviewScheduleTypeDB,
  InterviewSession,
  JobApplcationDB,
  PublicJobsType,
  RecruiterType,
  // CandidateType,
  // PublicJobsType,
  ScheduleAgentChatHistoryTypeDB,
} from '@/src/types/data.types';
import { schedulingSettingType } from '@/src/types/scheduleTypes/scheduleSetting';
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
    task_id: string;
    candidate_id: string;
    organizer_name: string;
    interview_meetings: InterviewMeetingTypeDb[];
    meeting_summary: string;
    job_description: string;
    comp_scheduling_setting: schedulingSettingType;
    filter_id: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
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
    const header = getNewMailHeader(fields.headers[0]);

    if (!agent_payload) {
      return res.status(204).send('');
    }

    await log_task_progress({
      log_msg: 'Candidate Agent chat',
      task_id: agent_payload.payload.task_id,
      transcript: { message: cleaned_email_body },
      created_by: {
        id: agent_payload.payload.candidate_id,
        name: agent_payload.payload.candidate_name,
      },
      progress_type: 'email_messages',
    });

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_AGENT_API}/api/email-agent/compose-email`,
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
      task_id: agent_payload.payload.task_id,
      transcript: {
        message: data.new_history[data.new_history.length - 1]?.value,
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
      candidate_name: agent_payload.payload.candidate_name,
      job_role: agent_payload.payload.job_role,
      headers: header ?? undefined,
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
        '*, interview_filter_json(* ,interview_schedule(id,application_id, applications(*,public_jobs(id,recruiter_id,logo,job_title,company,description,recruiter(scheduling_settings)), candidates(*))))',
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
    organizer_name: string;
  };

  const sessions = supabaseWrap(
    await supabaseAdmin
      .from('interview_session')
      .select('*,interview_meeting(*)')
      .in('id', filter_json.session_ids),
  );

  const meet_status = sessions[0].interview_meeting.status;

  if (meet_status === 'completed') {
    // meeting completed
    return null;
  }

  let plan_summary = '';
  let meeting_summary = '';

  if (meet_status === 'waiting' || meet_status === 'cancelled') {
    sessions.forEach((sess, idx) => {
      if (sess.session_type === 'debrief') return;
      plan_summary +=
        `Session ${idx + 1}. ${sess.name}\n` +
        `- Duration ${sess.session_duration} ` +
        `- meeting place ${sess.schedule_type} ` +
        `- meeting break ${sess.break_duration} \n\n`;
    });
  } else if (meet_status === 'confirmed') {
    sessions.forEach((sess, idx) => {
      // let sess = sessions.find((s) => s.id === m.session_id);
      meeting_summary +=
        `Meeting ${idx + 1}. ${sess.name}\n` +
        `Meeting Date and time ${dayjs(sess.interview_meeting.start_time)
          .tz(filter_json.user_tz)
          .format('h a dddd DD MMMM')}` +
        `- Duration ${sess.session_duration} ` +
        `- meeting place ${sess.schedule_type} ` +
        `- meeting link ${sess.interview_meeting.meeting_link} ` +
        `- meeting break ${sess.break_duration} \n\n`;
    });
  }

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
      cand_application_status: sessions[0].interview_meeting.status,
      candidate_time_zone: filter_json.user_tz,
      interv_plan_summary: plan_summary,
      application_id: cand_rec.application_id,
      new_cand_msg: cand_email_body,
      interview_sessions: sessions.filter((s) => s.session_type !== 'debrief'),
      task_id: cand_rec.task_id,
      candidate_id:
        cand_rec.interview_filter_json.interview_schedule.applications
          .candidates.id,
      organizer_name: filter_json.organizer_name ?? job.company,
      interview_meetings: sessions.map((ses) => ses.interview_meeting),
      meeting_summary,
      job_description: job.description,
      comp_scheduling_setting: job.recruiter.scheduling_settings as any,
      filter_id: cand_rec.interview_filter_json.id,
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
          | 'recruiter_id'
          | 'company'
          | 'id'
          | 'logo'
          | 'job_title'
          | 'description'
        > & {
          recruiter: Pick<RecruiterType, 'scheduling_settings'>;
        };
      };
    };
  };
};

const getNewMailHeader = (headers: string) => {
  let newHeader = {};
  let record = {};
  headers.split('\n').forEach((field) => {
    const [key, val] = field.split(':');
    record[String(key)] = val;
  });

  newHeader = {
    'Message-ID': ``,
    'In-Reply-To': ``,
    References: record['References'],
  };

  return newHeader;
};
