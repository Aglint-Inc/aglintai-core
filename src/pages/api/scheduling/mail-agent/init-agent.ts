import dayjs from 'dayjs';

var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { InitAgentBodyParams } from '@/src/components/ScheduleAgent/types';

type GeoPoint = {
  type: string;
  coordinates: [number, number];
};

// import { SchedulingProgressStatusType } from '@/src/utils/scheduling_v2/mailagent/types';
import { EmailAgentId } from '@/src/components/Tasks/utils';
import { CandidatesScheduling } from '@/src/services/CandidateSchedule/CandidateSchedule';
import {
  CandidateType,
  EmailTemplateFields,
  InterviewFilterJsonType,
  InterviewScheduleTypeDB,
  JobApplcationDB,
  PublicJobsType,
  RecruiterType,
} from '@/src/types/data.types';
import { BookingDateFormat } from '@/src/utils/integrations/constants';
import { getFullName } from '@/src/utils/jsonResume';
import { getTimeZoneOfGeo } from '@/src/utils/location-to-time-zone';
import { log_task_progress } from '@/src/utils/scheduling_v2/utils';

import { supabaseAdmin } from '../../phone-screening/get-application-info';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let {
      cand_email,
      filter_json_id,
      interviewer_name,
      cand_time_zone,
      organizer_time_zone,
      task_id,
    } = req.body as InitAgentBodyParams;

    if (
      !cand_email ||
      !filter_json_id ||
      !interviewer_name ||
      !organizer_time_zone
    ) {
      return res.status(400).send('missing fields');
    }
    if (process.env.NODE_ENV === 'development') {
      cand_email = 'dileepwert@gmail.com';
    }

    const cand_details = await fetchCandDetails({
      filter_json_id,
      candidate_email: cand_email,
    });
    if (!cand_details.email_template) {
      throw new Error('email template not found');
    }

    const getInitialEmailTemplate = () => {
      const email_details = {
        '[candidateFirstName]': cand_details.candidate_name.split(' ')[0],
        '[companyName]': cand_details.company_name,
        '[jobRole]': cand_details.job_role,
        '[endDate]': CandidatesScheduling.convertDateFormatToDayjs(
          cand_details.filter_json.end_date,
          cand_details.filter_json.user_tz,
        ).format(BookingDateFormat),
        '[startDate]': CandidatesScheduling.convertDateFormatToDayjs(
          cand_details.filter_json.start_date,
          cand_details.filter_json.user_tz,
        )
          .tz(cand_details.filter_json.user_tz)
          .format(BookingDateFormat),
        '[companyTimeZone]': organizer_time_zone,
        '[candidateTimeZone]': cand_time_zone ?? null,
        '[selfScheduleLink]': `<a href='${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/invite/${cand_details.schedule_id}?filter_id=${filter_json_id}&task_id=${task_id}'>link</a>`,
      };

      return fillEmailTemplate(cand_details.email_template, email_details);
    };

    const email_details = getInitialEmailTemplate();
    // delete previous chat hitory of that candidate email email
    // testing purpose only
    supabaseWrap(
      await supabaseAdmin
        .from('scheduling-agent-chat-history')
        .delete()
        .eq('candidate_email', cand_email),
    );
    supabaseWrap(
      await supabaseAdmin.from('scheduling-agent-chat-history').insert({
        application_id: cand_details.application_id,
        job_id: cand_details.job_id,
        candidate_email: cand_email,
        chat_history: [
          {
            type: 'assistant',
            value: email_details.body,
          },
        ],
        company_id: cand_details.company_id,
        filter_json_id: filter_json_id,
        task_id: task_id ?? undefined,
      }),
    );
    let headers;
    await sendEmailFromAgent({
      candidate_email: cand_email,
      from_name: cand_details.company_name,
      mail_body: email_details.body,
      headers,
      subject: email_details.subject,
    });

    if (task_id) {
      supabaseWrap(
        await supabaseAdmin
          .from('new_tasks')
          .update({
            status: 'in_progress',
          })
          .eq('id', task_id),
      );
    }

    await log_task_progress({
      agent_type: 'email_agent',
      log_msg: 'Sent interview schedule email to {candidate}',
      task_id: task_id,
      candidate_name: cand_details.candidate_name,
      transcript: {
        message: email_details.body,
      },
      created_by: {
        id: EmailAgentId,
        name: 'Email Agent',
      },
      progress_type: 'email_messages',
    });

    return res.status(200).send('ok');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export default handler;

export const sendEmailFromAgent = async ({
  candidate_email,
  from_name,
  mail_body,
  headers,
  subject,
}) => {
  await axios.post(`${process.env.NEXT_PUBLIC_HOST_NAME}/api/sendgrid`, {
    email: candidate_email,
    fromEmail: process.env.NEXT_PUBLIC_AGENT_EMAIL,
    fromName: from_name,
    subject: subject,
    text: mail_body,
    headers,
  });
};

const fetchCandDetails = async ({ filter_json_id, candidate_email }) => {
  const [rec] = supabaseWrap(
    await supabaseAdmin
      .from('interview_filter_json')
      .select(
        '* ,interview_schedule(id,application_id, applications(*,public_jobs(id,recruiter_id,logo,job_title,company,email_template,recruiter(scheduling_settings)), candidates(*)))',
      )
      .eq('id', filter_json_id),
  ) as CandidateScheduleDetails[];

  if (!rec) {
    throw new Error('Invalid Application');
  }
  const cand_basic_info = rec.interview_schedule.applications.candidates;
  const job = rec.interview_schedule.applications.public_jobs;
  // const sched_setting = rec.interview_schedule;
  const filter_json = rec.filter_json as TFilterJSON;

  const geo = cand_basic_info.geolocation as GeoPoint | null;

  const int_sessions = supabaseWrap(
    await supabaseAdmin
      .from('interview_session')
      .select()
      .in('id', filter_json.session_ids),
  );

  let cand_details = {
    application_id: rec.interview_schedule.applications.id,
    job_id: job.id,
    candidate_email: candidate_email,
    filter_json: filter_json,
    candidate_name: getFullName(
      cand_basic_info.first_name,
      cand_basic_info.last_name,
    ),
    // date_range: [start_date, end_date],
    company_id: job.recruiter_id,
    // recruiter_user_id:,
    time_zone: filter_json.user_tz,
    company_name: job.company,
    job_role: job.job_title,
    schedule_name: `Interview for ${job.job_title} - ${getFullName(
      cand_basic_info.first_name,
      cand_basic_info.last_name,
    )}`,
    interview_sessions: int_sessions,
    schedule_id: rec.schedule_id,
    email_template: job.email_template['init_email_agent'],
  };
  if (geo) {
    const timeZoneCode = await getTimeZoneOfGeo({
      lang: geo.coordinates[0],
      lat: geo.coordinates[1],
    });
    cand_details.time_zone = timeZoneCode;
  }

  return cand_details;
};

export type TFilterJSON = {
  user_tz: string;
  end_date: string;
  start_date: string;
  session_ids: string[];
  recruiter_id: string;
  organizer_name: string;
};

type CandidateScheduleDetails = InterviewFilterJsonType & {
  interview_schedule: Pick<InterviewScheduleTypeDB, 'id' | 'application_id'> & {
    applications: Pick<JobApplcationDB, 'id'> & {
      candidates: Pick<
        CandidateType,
        'first_name' | 'last_name' | 'email' | 'geolocation'
      >;
      public_jobs: Pick<
        PublicJobsType,
        | 'recruiter_id'
        | 'company'
        | 'id'
        | 'logo'
        | 'job_title'
        | 'email_template'
      > & {
        recruiter: Pick<RecruiterType, 'scheduling_settings'>;
      };
    };
  };
};

const fillEmailTemplate = (
  email_template: EmailTemplateFields,
  dynamic_fields: Record<string, string>,
): EmailTemplateFields => {
  let updated_template = { ...email_template };
  for (let key of Object.keys(dynamic_fields)) {
    updated_template.subject = updated_template.subject.replaceAll(
      key,
      dynamic_fields[String(key)],
    );
    updated_template.body = updated_template.body.replaceAll(
      key,
      dynamic_fields[String(key)],
    );
  }

  return updated_template;
};
