/* eslint-disable security/detect-object-injection */
import axios from 'axios';
import dayjs from 'dayjs';

import { InterviewScheduleTypeDB } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabase/client';
import { fillEmailTemplate } from '@/src/utils/support/supportUtils';
import toast from '@/src/utils/toast';

import { ApiResponse } from '../CandidateInvite/type';

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
};

export const mailHandler = async ({
  schedule_id,
  rec_id,
  candidate_name,
  schedule_name,
  mail,
  position,
}: MailHandlerparam) => {
  try {
    const { data, error } = await supabase
      .from('recruiter')
      .select('name, email_template')
      .eq('id', rec_id);
    if (error) throw new Error(error.message);

    if (data[0].email_template)
      await axios
        .post('/api/sendgrid', {
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
              pick_your_slot_link: `<a href='${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/invite/${schedule_id}'>Pick Your Slot</a>`,
            },
          ),
        })
        .then((res) =>
          res.status === 200 && res.data.data === 'Email sent'
            ? true
            : toast.error('Unable to send mail. Please try again later.'),
        );
  } catch (e) {
    toast.error('Unable to send mail. Please try again later.');
  }
};

const TYPE_LABELS = {
  google_meet: 'Google Meet',
  in_person_meeting: 'In Person Meeting',
  phone_call: 'Phone Call',
};

export const getScheduleType = (
  schedule_type: InterviewScheduleTypeDB['schedule_type'],
) => TYPE_LABELS[schedule_type] || 'Zoom';

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
  status: InterviewScheduleTypeDB['status'],
) => {
  return status === 'completed'
    ? '#D1E8DF80'
    : status === 'confirmed'
      ? '#CEE2F2'
      : status === 'pending'
        ? '#FFEDC2'
        : '#FFF0F1';
};

export const getScheduleTextcolor = (
  status: InterviewScheduleTypeDB['status'],
) => {
  return status === 'completed'
    ? '#186146'
    : status === 'confirmed'
      ? '#0F3554'
      : status === 'pending'
        ? '#703815'
        : '#681219';
};

export function getAllUniqueDates({
  records,
}: {
  records: ApiResponse['schedulingOptions'];
}) {
  const dates = new Set();

  records.forEach((record) => {
    record.plans.forEach((plan) => {
      const planDate = dayjs(plan.start_time).format('YYYY-MM-DD');
      dates.add(planDate);
    });
  });

  return Array.from(dates).sort();
}

export function filterRecordsByDate({
  records,
  date,
}: {
  records: ApiResponse['schedulingOptions'];
  date: string;
}) {
  const filteredRecords = records.filter((record) => {
    return record.plans.some((plan) => {
      const planDate = dayjs(plan.start_time).format('YYYY-MM-DD');
      return planDate === date;
    });
  });

  return filteredRecords;
}
