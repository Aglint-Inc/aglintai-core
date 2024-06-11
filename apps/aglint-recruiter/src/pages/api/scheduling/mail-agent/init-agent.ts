/* eslint-disable no-console */
import dayjs from 'dayjs';

var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidV4 } from 'uuid';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { InitAgentBodyParams } from '@/src/components/ScheduleAgent/types';
type GeoPoint = {
  type: string;
  coordinates: [number, number];
};

// import { SchedulingProgressStatusType } from '@/src/utils/scheduling_v2/mailagent/types';
import {
  CandidateType,
  InterviewFilterJsonType,
  InterviewScheduleTypeDB,
  JobApplcationDB,
  PublicJobsType,
  RecruiterType,
} from '@aglint/shared-types';
import { schedulingSettingType } from '@aglint/shared-types';
import { ScheduleUtils } from '@aglint/shared-utils';

import { EmailWebHook } from '@/src/services/EmailWebhook/EmailWebhook';
import {
  CompanyEmailsTypeDB,
  EmailDynamicParams,
} from '@/src/types/companyEmailTypes';
import { EmailTemplateFiller } from '@/src/utils/emailTemplate/EmailTemplateFiller';
import { BookingDateFormat } from '@/src/utils/integrations/constants';
import { getFullName } from '@/src/utils/jsonResume';
import { getTimeZoneOfGeo } from '@/src/utils/location-to-time-zone';
import { agent_activities } from '@/src/utils/scheduling_v2/agents_activity';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

import { getCandidateLogger } from '../../../../utils/scheduling_v2/getCandidateLogger';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { filter_json_id, task_id, recruiter_user_id } =
    req.body as InitAgentBodyParams;
  const candLogger = getCandidateLogger(task_id, '', '', 'email_agent');
  try {
    if (!recruiter_user_id || !filter_json_id) {
      return res.status(400).send('missing fields');
    }

    const cand_details = await fetchCandDetails({
      filter_json_id,
    });
    if (!cand_details.email_template) {
      throw new Error('Email template not found.');
    }

    const getInitialEmailTemplate = () => {
      const email_details: EmailDynamicParams<'init_email_agent'> = {
        '[candidateFirstName]': cand_details.candidate_name.split(' ')[0],
        '[companyName]': cand_details.company_name,
        '[jobRole]': cand_details.job_role,
        '[endDate]': ScheduleUtils.convertDateFormatToDayjs(
          cand_details.filter_json.end_date,
          cand_details.company_timezone,
        ).format(BookingDateFormat),
        '[startDate]': ScheduleUtils.convertDateFormatToDayjs(
          cand_details.filter_json.start_date,
          cand_details.company_timezone,
        ).format(BookingDateFormat),
        '[companyTimeZone]': cand_details.company_timezone,
        '[candidateTimeZone]': cand_details.time_zone,
        '[selfScheduleLink]': `<a href='${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/invite/${cand_details.schedule_id}?filter_id=${filter_json_id}&task_id=${task_id}'>link</a>`,
      };
      const temp_filler = new EmailTemplateFiller(cand_details.email_template);
      const filled_temp = temp_filler.fillEmail(
        'init_email_agent',
        email_details,
      );
      return filled_temp;
    };

    const email_details = getInitialEmailTemplate();
    const thread_id = uuidV4();

    supabaseWrap(
      await supabaseAdmin.from('scheduling-agent-chat-history').insert({
        application_id: cand_details.application_id,
        job_id: cand_details.job_id,
        chat_history: [
          {
            type: 'assistant',
            value: email_details.body,
          },
        ],
        company_id: cand_details.company_id,
        filter_json_id: filter_json_id,
        task_id: task_id ?? undefined,
        thread_id: thread_id,
        agent_processing: false,
      }),
    );

    // const message_id = `<${conversation_id}.${Date.now()}@parse.aglinthq.com>`;
    const message_id = EmailWebHook.getMessageId(
      thread_id,
      process.env.NEXT_PUBLIC_AGENT_EMAIL,
    );
    let headers = {
      'Message-ID': message_id,
      'In-Reply-To': message_id,
    };
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

    await candLogger(
      `Sent interview schedule email to {candidate}`,
      {
        '{candidate}': cand_details.candidate_name,
      },
      'email_agent',
      'email_messages',
      {
        message: email_details.body,
      },
    );

    return res.status(200).send('ok');
  } catch (error) {
    console.error(error.message);
    await candLogger(
      agent_activities.email_agent.init_agent.failed_to_init,
      {},
    );
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
        '* ,interview_schedule(id,application_id, applications(*,public_jobs(id,recruiter_id,logo,job_title,company,email_template,recruiter!public_jobs_recruiter_id_fkey(scheduling_settings,email_template)), candidates(*)))',
      )
      .eq('id', filter_json_id),
  ) as unknown as CandidateScheduleDetails[];

  if (!rec) {
    throw new Error('Invalid Application');
  }
  const cand_basic_info = rec.interview_schedule.applications.candidates;
  const job = rec.interview_schedule.applications.public_jobs;
  // const sched_setting = rec.interview_schedule;
  const filter_json = rec.filter_json;

  const geo = cand_basic_info.geolocation as GeoPoint | null;
  if (rec.session_ids.length === 0) {
    throw new Error('Empty sessions');
  }

  const int_sessions = supabaseWrap(
    await supabaseAdmin
      .from('interview_session')
      .select()
      .in('id', rec.session_ids),
  );

  const company_sched_sett = job.recruiter
    .scheduling_settings as schedulingSettingType;
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
    time_zone: cand_basic_info.timezone,
    company_timezone: company_sched_sett.timeZone.tzCode,
    company_name: job.company,
    job_role: job.job_title,
    schedule_name: `Interview for ${job.job_title} - ${getFullName(
      cand_basic_info.first_name,
      cand_basic_info.last_name,
    )}`,
    interview_sessions: int_sessions,
    schedule_id: rec.schedule_id,
    email_template: job.recruiter.email_template as CompanyEmailsTypeDB,
    candidate_id: cand_basic_info.id,
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

type CandidateScheduleDetails = InterviewFilterJsonType & {
  interview_schedule: Pick<InterviewScheduleTypeDB, 'id' | 'application_id'> & {
    applications: Pick<JobApplcationDB, 'id'> & {
      candidates: Pick<
        CandidateType,
        'first_name' | 'last_name' | 'email' | 'geolocation' | 'timezone' | 'id'
      >;
      public_jobs: Pick<
        PublicJobsType,
        'recruiter_id' | 'company' | 'id' | 'logo' | 'job_title'
      > & {
        recruiter: Pick<
          RecruiterType,
          'scheduling_settings' | 'email_template'
        >;
      };
    };
  };
};
