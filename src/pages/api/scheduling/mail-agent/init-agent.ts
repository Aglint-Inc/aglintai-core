/* eslint-disable no-console */
// /* eslint-disable no-console */
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
import {
  CandidateType,
  InterviewFilterJsonType,
  InterviewScheduleTypeDB,
  JobApplcationDB,
  PublicJobsType,
  RecruiterType,
} from '@/src/types/data.types';
import { getFullName } from '@/src/utils/jsonResume';
import { getTimeZoneOfGeo } from '@/src/utils/location-to-time-zone';
import {
  convertDateFormatToDayjs,
  log_task_progress,
} from '@/src/utils/scheduling_v2/utils';

import { supabaseAdmin } from '../../phone-screening/get-application-info';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let {
      cand_email,
      filter_json_id,
      interviewer_name,
      cand_time_zone = 'Asia/colombo',
      organizer_time_zone = 'Asia/colombo',
      sub_task_id,
    } = req.body as InitAgentBodyParams;

    if (
      !cand_email ||
      !cand_time_zone ||
      !filter_json_id ||
      !interviewer_name ||
      !organizer_time_zone
    ) {
      return res.status(400).send('missing fields');
    }

    const cand_details = await fetchCandDetails({
      filter_json_id,
      candidate_email: cand_email,
    });

    const initMailBody = getInitialEmailTemplate({
      candidate_name: cand_details.candidate_name,
      company_name: cand_details.company_name,
      job_role: cand_details.job_role,
      end_date: convertDateFormatToDayjs(
        cand_details.filter_json.end_date,
        cand_details.filter_json.user_tz,
      ).format('DD MMMM'),
      start_date: convertDateFormatToDayjs(
        cand_details.filter_json.start_date,
        cand_details.filter_json.user_tz,
      )
        .tz(cand_details.filter_json.user_tz)
        .format('DD MMMM'),
      organizer_time_zone,
      candidate_time_zone: cand_details.filter_json.user_tz,
    });

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
            value: initMailBody,
          },
        ],
        company_id: cand_details.company_id,
        filter_json_id: filter_json_id,
        time_zone: cand_details.time_zone,
        sub_task_id: sub_task_id ?? undefined,
      }),
    );
    let headers;
    await sendEmailFromAgent({
      candidate_email: cand_email,
      from_name: cand_details.company_name,
      mail_body: initMailBody,
      headers,
      candidate_name: cand_details.candidate_name,
      job_role: cand_details.job_role,
    });

    if (sub_task_id) {
      supabaseWrap(
        await supabaseAdmin
          .from('sub_tasks')
          .update({
            status: 'in_progress',
          })
          .eq('id', sub_task_id),
      );
    }

    await log_task_progress({
      agent_type: 'email_agent',
      log_msg: 'Sent interview schedule email to {candidate}',
      sub_task_id: sub_task_id,
      candidate_name: cand_details.candidate_name,
      transcript: {
        message: initMailBody,
      },
      created_by: {
        id: EmailAgentId,
        name: 'Email Agent',
      },
      progress_type: 'email_messages',
    });

    return res.status(200).send('ok');
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

export default handler;
const getInitialEmailTemplate = ({
  candidate_name,
  company_name,
  job_role,
  start_date,
  end_date,
  organizer_time_zone,
  candidate_time_zone,
}) => {
  return (
    `<p>Hi ${candidate_name},</p>` +
    `<p>Congratulations! Your resume has passed our initial screening for the ${job_role} position at ${company_name}. Impressive qualifications! Let's schedule your interview.</p>` +
    `<p>Please let me know your availability from the following date range :</p>` +
    `<p>${start_date} - ${end_date} (${organizer_time_zone}).</p>` +
    `<p>Reply to this email with your preferred date and time (${candidate_time_zone}).</p>` +
    `${
      candidate_time_zone
        ? ''
        : `<p>Also, to make sure we find an interview time that works well for you, could you tell us your general location (city, state)?</p>`
    }` +
    `<p>I'll confirm the interview details promptly. Excited to discuss your potential role at ${company_name}. Any questions? Feel free to reach out.</p>` +
    `<p>Best regards,<br>Your Name</p>`
  );
};

export const sendEmailFromAgent = async ({
  candidate_email,
  from_name,
  mail_body,
  headers,
  job_role,
  candidate_name,
}) => {
  await axios.post(`${process.env.NEXT_PUBLIC_HOST_NAME}/api/sendgrid`, {
    email: candidate_email,
    fromEmail: 'agent@ai.aglinthq.com',
    // process.env.NODE_ENV === 'development'
    //   ? 'agent@parse.aglinthq.com'
    //   : 'agent@ai.aglinthq.com',
    fromName: from_name,
    subject: `Interview for ${job_role} - ${candidate_name}`,
    text: mail_body,
    headers,
  });
};

const fetchCandDetails = async ({ filter_json_id, candidate_email }) => {
  const [rec] = supabaseWrap(
    await supabaseAdmin
      .from('interview_filter_json')
      .select(
        '* ,interview_schedule(id,application_id, applications(*,public_jobs(id,recruiter_id,logo,job_title,company,recruiter(scheduling_settings)), candidates(*)))',
      )
      .eq('id', filter_json_id),
  ) as CandidateScheduleDetails[];

  if (!rec) {
    throw new Error('Invalid Application');
  }
  const cand_basic_info = rec.interview_schedule.applications.candidates;
  const job = rec.interview_schedule.applications.public_jobs;
  // const sched_setting = rec.interview_schedule;
  const filter_json = rec.filter_json as {
    user_tz: string;
    end_date: string;
    start_date: string;
    session_ids: string[];
    recruiter_id: string;
  };

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
        'first_name' | 'last_name' | 'email' | 'geolocation'
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
