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
import { SchedulingProgressStatusType } from '@/src/utils/scheduling_v2/mailagent/types';

import { supabaseAdmin } from '../../phone-screening/get-application-info';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      application_id,
      job_id,
      candidate_email,
      candidate_name,
      date_range,
      company_id,
      recruiter_user_id,
    } = req.body as InitAgentBodyParams;

    if (
      !application_id ||
      !job_id ||
      !candidate_email ||
      !candidate_name ||
      !date_range ||
      !company_id ||
      !recruiter_user_id
    ) {
      return res.status(400).send('missing fields');
    }

    const [job] = supabaseWrap(
      await supabaseAdmin
        .from('public_jobs')
        .select('company,job_title,interview_plan')
        .eq('id', job_id),
    );
    const initMailBody = getInitialEmailTemplate({
      candidate_name: candidate_name,
      company_name: job.company,
      end_date: dayjs(date_range[1]).format('DD MMMM'),
      start_date: dayjs(date_range[0]).format('DD MMMM'),
      job_role: job.job_title,
    });

    const [rec_schedule] = supabaseWrap(
      await supabaseAdmin
        .from('interview_schedule')
        .insert({
          application_id,
          schedule_name: job.job_title,
          schedule_type: 'google_meet',
          interview_plan: job.interview_plan.plan,
          filter_json: {
            job_id: job.job_title,
            company_id: company_id,
            start_date: date_range[0],
            end_date: date_range[1],
          },
          created_by: recruiter_user_id,
        })
        .select(),
    );
    const status: SchedulingProgressStatusType = 'scheduled';

    supabaseWrap(
      await supabaseAdmin.from('scheduling-agent-chat-history').insert({
        application_id,
        job_id,
        candidate_email,
        date_range,
        scheduling_progress: status,
        chat_history: [
          {
            type: 'user',
            value: initMailBody,
          },
        ],
        company_id,
        schedule_id: rec_schedule.id,
      }),
    );
    await sendEmailFromAgent({
      candidate_email,
      from_name: job.company,
      mail_body: initMailBody,
      subject: `Interview for ${job.job_title} - ${
        candidate_name.split(' ')[0]
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
}) => {
  return (
    `Congratulations, ${candidate_name}! Your resume has passed our initial screening for the ${job_role} position at ${company_name}. Impressive qualifications! Let's schedule your interview.\n` +
    `Please let me know your availability from the following date range:
${start_date} - ${end_date}.\n` +
    `Reply to this email with your preferred date and time. I'll confirm the interview details promptly. Excited to discuss your potential role at ${company_name}. Any questions? Feel free to reach out.
  `
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
