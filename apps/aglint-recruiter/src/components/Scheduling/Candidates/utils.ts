/* eslint-disable security/detect-object-injection */
import { InterviewMeetingTypeDb } from '@aglint/shared-types';
import { DB } from '@aglint/shared-types';
import { createServerClient } from '@supabase/ssr';
import axios from 'axios';

import { getFullName } from '@/src/utils/jsonResume';
import { fillEmailTemplate } from '@/src/utils/support/supportUtils';
import toast from '@/src/utils/toast';

export interface TimeSlot {
  startTime: string;
  endTime: string;
  user_ids: string[];
  isSelected?: boolean;
}

export type MailHandlerparam = {
  application_id: string;
  filter_id: string;
  supabase: ReturnType<typeof createServerClient<DB>>;
};

export const mailHandler = async ({
  application_id,
  filter_id,
  supabase,
}: MailHandlerparam) => {
  try {
    const { data, error } = await supabase
      .from('applications')
      .select(
        'id,candidates(*),public_jobs(id,job_title,sourcer,recruiter,hiring_manager,recruiting_coordinator,recruiter!public_jobs_recruiter_id_fkey(id),recruiter_user!public_jobs_hiring_manager_fkey(user_id,first_name,last_name,email,profile_image)),interview_schedule(*)',
      )
      .eq('id', application_id)
      .single();

    if (error) throw new Error(error.message);

    const candidate_email = data.candidates.email;
    const candidate_name = getFullName(
      data.candidates.first_name,
      data.candidates.last_name,
    );
    const position = data.public_jobs.job_title;
    const schedule_name = data.interview_schedule.schedule_name;
    const schedule_id = data.interview_schedule.id;

    if (data[0].email_template) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_NAME}/api/sendgrid`,
        {
          fromEmail: `messenger@aglinthq.com`,
          fromName: 'Aglint',
          email: candidate_email,
          subject: fillEmailTemplate(
            data[0].email_template['candidate_availability_request'].subject,
            {
              company_name: data[0].name,
              schedule_name: schedule_name,
              first_name: candidate_name,
              last_name: '',
              job_title: position,
            },
          ),
          text: fillEmailTemplate(
            data[0].email_template['candidate_availability_request'].body,
            {
              company_name: data[0].name,
              schedule_name: schedule_name,
              first_name: candidate_name,
              last_name: '',
              job_title: position,
              pick_your_slot_link: `<a href='${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/invite/${schedule_id}?filter_id=${filter_id}'>Pick Your Slot</a>`,
            },
          ),
        },
      );

      if (res.status === 200 && res.data.data === 'Email sent') {
        return true;
      } else {
        toast.error('Unable to send mail. Please try again later.');
      }
    }
  } catch (e) {
    toast.error('Unable to send mail. Please try again later.');
  }
};

const TYPE_LABELS = {
  google_meet: 'Google Meet',
  in_person_meeting: 'In Person Meeting',
  phone_call: 'Phone Call',
  zoom: 'Zoom',
};

export const getScheduleType = (
  schedule_type: DB['public']['Enums']['interview_schedule_type'],
) => TYPE_LABELS[schedule_type] || 'Google Meet';

export function convertNumberToWord(number) {
  const units = [
    '',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];
  const teens = [
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
  ];
  const tens = [
    '',
    '',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
  ];

  if (number === 0) return 'zero';

  let result = '';

  if (number >= 100) {
    result += units[Math.floor(number / 100)] + ' hundred ';
    number %= 100;
  }

  if (number >= 10 && number < 20) {
    return result + teens[number - 10];
  } else if (number >= 20) {
    result += tens[Math.floor(number / 10)];
    number %= 10;
    if (number > 0) result += '-';
  }

  if (number > 0) {
    result += units[number];
  }

  return result.trim();
}

export function transformData(inputData) {
  const transformedData = {};

  inputData?.forEach((item) => {
    const date = item.start_time.split('T')[0]; // Extracting date from start_time
    if (!transformedData[date]) {
      transformedData[date] = [];
    }
    transformedData[date].push(item);
  });

  const result = [];
  for (const date in transformedData) {
    result.push({ [date]: transformedData[date] });
  }

  return result;
}

export const getScheduleBgcolor = (
  status: InterviewMeetingTypeDb['status'],
) => {
  return status === 'completed'
    ? '#228F67'
    : status === 'confirmed'
      ? '#337FBD'
      : status === 'cancelled'
        ? '#D93F4C'
        : status === 'waiting'
          ? '#F79A3E'
          : '#C2C8CC';
};

export const getScheduleTextcolor = (
  status: InterviewMeetingTypeDb['status'],
) => {
  return status === 'completed'
    ? '#186146'
    : status === 'confirmed'
      ? '#0F3554'
      : status === 'waiting'
        ? '#703815'
        : '#681219';
};

export const cancelMailHandler = async ({
  rec_id,
  candidate_name,
  session_name,
  mail,
  job_title,
  supabase,
  rec_mail,
}) => {
  try {
    const { data, error } = await supabase
      .from('recruiter')
      .select('name, email_template')
      .eq('id', rec_id);
    if (error) throw new Error(error.message);

    if (data[0].email_template) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_NAME}/api/sendgrid`,
        {
          fromEmail: `messenger@aglinthq.com`,
          fromName: 'Aglint',
          email: rec_mail ?? mail,
          subject: fillEmailTemplate(
            data[0].email_template['cancel_interview_session'].subject,
            {
              company_name: data[0].name,
              first_name: candidate_name,
              last_name: '',
              job_title: job_title,
              session_name: session_name,
            },
          ),
          text: fillEmailTemplate(
            data[0].email_template['cancel_interview_session'].body,
            {
              company_name: data[0].name,
              first_name: candidate_name,
              last_name: '',
              job_title: job_title,
              session_name: session_name,
            },
          ),
        },
      );

      if (res.status === 200 && res.data.data === 'Email sent') {
        return true;
      } else {
        toast.error('Unable to send mail. Please try again later.');
      }
    }
  } catch (e) {
    toast.error('Unable to send mail. Please try again later.');
  }
};
