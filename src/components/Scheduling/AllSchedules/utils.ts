/* eslint-disable security/detect-object-injection */
import { createServerClient } from '@supabase/ssr';
import axios from 'axios';

import { InterviewMeetingTypeDb } from '@/src/types/data.types';
import { Database } from '@/src/types/schema';
import { fillEmailTemplate } from '@/src/utils/support/supportUtils';
import toast from '@/src/utils/toast';

export interface TimeSlot {
  startTime: string;
  endTime: string;
  user_ids: string[];
  isSelected?: boolean;
}

export type MailHandlerparam = {
  rec_id: string;
  candidate_name: string;
  schedule_name: string;
  mail: string;
  position: string;
  schedule_id: string;
  filter_id: string;
  supabase: ReturnType<typeof createServerClient<Database>>;
};

export const mailHandler = async ({
  schedule_id,
  rec_id,
  candidate_name,
  schedule_name,
  mail,
  position,
  filter_id,
  supabase,
}: MailHandlerparam) => {
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
          email: 'admin@aglinthq.com' ?? mail,
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
  schedule_type: Database['public']['Enums']['interview_schedule_type'],
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
    ? '#D1E8DF80'
    : status === 'confirmed'
      ? '#CEE2F2'
      : status === 'waiting'
        ? '#FFEDC2'
        : '#FFF0F1';
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
