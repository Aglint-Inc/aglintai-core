/* eslint-disable no-console */
import dayjs from 'dayjs';

var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { InitAgentBodyParams } from '@/src/components/ScheduleAgent/types';
import {
  CandidateFileTypeDB,
  CandidateType,
  PublicJobsType,
} from '@/src/types/data.types';

type GeoPoint = {
  type: string;
  coordinates: [number, number];
};

// import { SchedulingProgressStatusType } from '@/src/utils/scheduling_v2/mailagent/types';
import { getTimeZoneOfGeo } from '@/src/utils/location-to-time-zone';
import { SchedulingProgressStatusType } from '@/src/utils/scheduling_v2/mailagent/types';

import { supabaseAdmin } from '../../phone-screening/get-application-info';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      application_id,
      start_date,
      end_date,
      company_id,
      recruiter_user_id,
      organizer_time_zone,
    } = req.body as InitAgentBodyParams;

    if (
      !application_id ||
      !start_date ||
      !end_date ||
      !company_id ||
      !recruiter_user_id ||
      !organizer_time_zone
    ) {
      return res.status(400).send('missing fields');
    }

    const cand_details = await fetchCandDetails({ application_id });

    const initMailBody = getInitialEmailTemplate({
      candidate_name: cand_details.candidate_name,
      company_name: cand_details.company_name,
      job_role: cand_details.job_role,
      end_date,
      start_date,
      organizer_time_zone,
      candidate_time_zone: cand_details.time_zone,
    });

    const [rec_schedule] = supabaseWrap(
      await supabaseAdmin
        .from('interview_schedule')
        .insert({
          application_id,
          schedule_name: cand_details.schedule_name,
          interview_plan: (cand_details.interview_plan as any).plan,
          schedule_type: 'google_meet',
          filter_json: {
            job_id: cand_details.job_id,
            company_id: company_id,
            start_date,
            end_date,
          },
          created_by: recruiter_user_id,
        })
        .select(),
    );
    const status: SchedulingProgressStatusType = 'scheduled';
    supabaseWrap(
      await supabaseAdmin.from('scheduling-agent-chat-history').insert({
        application_id,
        job_id: cand_details.job_id,
        candidate_email: cand_details.candidate_email,
        date_range: [start_date, end_date],
        scheduling_progress: status,
        chat_history: [
          {
            type: 'user',
            value: initMailBody,
          },
        ],
        company_id,
        schedule_id: rec_schedule.id,
        time_zone: cand_details.time_zone,
      }),
    );

    await sendEmailFromAgent({
      candidate_email: cand_details.candidate_email,
      from_name: cand_details.company_name,
      mail_body: initMailBody,
      subject: `Interview for ${cand_details.job_role} - ${
        cand_details.candidate_name.split(' ')[0]
      }`,
    });
    return res.status(200).send(status);
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
    `Congratulations, ${candidate_name}! Your resume has passed our initial screening for the ${job_role} position at ${company_name}.` +
    `Impressive qualifications! Let's schedule your interview.\n` +
    `Please let me know your availability from the following date range (${organizer_time_zone}) :` +
    `${dayjs(start_date).tz(organizer_time_zone).format('DD MMMM')}` +
    `- ${dayjs(end_date).tz(organizer_time_zone).format('DD MMMM')}.\n` +
    `Reply to this email with your preferred date and time.\n` +
    `${
      candidate_time_zone
        ? ''
        : `Also to make sure we find an interview time that works well for you, could you tell us your general location (city, state)?\n`
    }` +
    `I'll confirm the interview details promptly. Excited to discuss your potential role at ${company_name}. Any questions? Feel free to reach out.`
  );
};

export const sendEmailFromAgent = async ({
  candidate_email,
  from_name,
  mail_body,
  subject,
}) => {
  await axios.post(`${process.env.NEXT_PUBLIC_HOST_NAME}/api/sendgrid`, {
    email: candidate_email,
    fromEmail:
      process.env.NODE_ENV === 'development'
        ? 'agent@parse.aglinthq.com'
        : 'agent@ai.aglinthq.com',
    fromName: from_name,
    subject,
    text: mail_body,
  });
};

const fetchCandDetails = async ({ application_id }) => {
  //considering only 1 application of the candidate
  const [rec] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select(
        'id, candidate_files(resume_json,candidate_id),public_jobs(id,job_title,company,interview_plan,recruiter_id), candidates(*)',
      )
      .eq('id', application_id),
  ) as {
    id: string;
    candidate_files: CandidateFileTypeDB;
    public_jobs: PublicJobsType;
    candidates: CandidateType;
  }[];

  if (!rec) {
    throw new Error('Invalid Application');
  }

  if (!rec.public_jobs.interview_plan) {
    throw new Error('Interview plan not set the job');
  }
  const geo = rec.candidates.geolocation as GeoPoint | null;

  let cand_details = {
    application_id: rec.id,
    job_id: rec.public_jobs.id,
    candidate_email:
      rec.candidates?.email ??
      (rec.candidate_files.resume_json as any).basics.email,
    candidate_name: (rec.candidate_files.resume_json as any).basics.firstName,
    // date_range: [start_date, end_date],
    company_id: rec.public_jobs.recruiter_id,
    // recruiter_user_id:,
    time_zone: null,
    company_name: rec.public_jobs.company,
    job_role: rec.public_jobs.job_title,
    schedule_name: `Interview for ${rec.public_jobs.job_title} - ${rec.candidates.first_name}`,
    interview_plan: (rec.public_jobs.interview_plan as any).plan,
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
