/* eslint-disable security/detect-object-injection */
import axios from 'axios';
import dayjs from 'dayjs';

import { InterviewScheduleTypeDB } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { ApiResponse } from '../CandidateInvite/type';

export interface TimeSlot {
  startTime: string;
  endTime: string;
  user_ids: string[];
  isSelected?: boolean;
}

export type MailHandlerparam = {
  id: string;
  company_name: string;
  company_logo: string;
  candidate_name: string;
  schedule_name: string;
  mail?: string;
};

export const mailHandler = async ({
  id,
  company_name,
  company_logo,
  candidate_name,
  schedule_name,
  mail,
}: MailHandlerparam) => {
  try {
    await axios
      .post('/api/sendgrid', {
        fromEmail: `messenger@aglinthq.com`,
        fromName: 'Aglint',
        email: mail ? mail : 'admin@aglinthq.com',
        subject: `You have been selected for the interview at ${company_name}`,
        text: `<body style="background-color: #f4f4f4; font-family: Arial, sans-serif; margin: 0; padding: 20px;">
        <div style="background-color: #ffffff; max-width: 600px; margin: auto; padding: 20px; text-align: center; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <img src="${company_logo}" alt="Company Logo" style="width: 60px; height:60px;border-radius:4px; margin-bottom: 20px;">
            <h1 style="font-size: 18px; color: #333333;">You have selected for the Interview at ${company_name}</h1>
            <p style="color: #68737D; font-size: 14px; margin-bottom: 30px;">Hi ${candidate_name}, Choose a time slot that suits you best and take the first step towards joining our team. We look forward to meeting you!</p>
            <div style="background-color: #f9f9f9; padding: 10px; margin-bottom: 20px;">
                <h2 style="color: #333333; font-size: 16px; margin: 0;">${schedule_name}</h2>
                <p style="margin: 5px 0 0px; color: #68737D; font-size: 12px;">30 Minutes <img src="https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/company-logo/public/google-meet.png?t=2024-02-13T13%3A08%3A33.200Z" alt="Company Logo" style="height:12px; width:12px;"><span style="margin-left:10px">Google Meet</span></p>
            </div>
            <a href="${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/invite/${id}" style="background-color: #337FBD; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block; margin-bottom: 20px;">Pick Your Slot</a>
            <p style="color: #999999; font-size: 12px;"><span style="margin-bottom:4px;">Powered By</span> <span style="color: #e67e22; font-weight: bold;"><img src="https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/assets/aglint_logo.png?t=2024-02-13T13%3A14%3A04.632Z" alt="Company Logo" style="height:12px; width:50px;"></span> <span style="margin-left:10px; margin-bottom:4px;">© 2023 Aglint Inc. All Rights Reserved.</span> </p>
        </div>
    </body>`,
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

export const getPaginationDB = async ({
  recruiter,
  filter,
}: {
  recruiter: { id: string };
  filter: {
    status: string[];
    textSearch: string;
    scheduleType: string[];
    sortBy: string;
    job_ids: string[];
    panel_ids: string[];
  };
}) => {
  try {
    const { data, error } = await supabase.rpc('get_interview_data_count', {
      rec_id: recruiter.id,
      status_filter: filter.status?.length > 0 ? filter.status : null,
      text_search_filter: filter.textSearch,
      sch_type: filter.scheduleType?.length > 0 ? filter.scheduleType : null,
      job_id_filter: filter.job_ids?.length > 0 ? filter.job_ids : null,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    toast.error('Error fetching interview data');
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
