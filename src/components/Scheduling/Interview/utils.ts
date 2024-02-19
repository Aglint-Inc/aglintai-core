import axios from 'axios';

import { InterviewScheduleTypeDB } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { InterviewSlice } from './store';

/* eslint-disable security/detect-object-injection */
export function findIntersection(
  availabilities: {
    user_id: string;
    availibility_json: {
      availability: {
        [date: string]: {
          status: string;
          endTime: string;
          startTime: string;
        }[];
      };
      timeDuration: number;
    } | null;
  }[],
): IntersectionResult {
  let intersection: IntersectionResult = {};

  // Iterate over each availability date
  availabilities.forEach((person) => {
    if (person.availibility_json && person.availibility_json.availability) {
      const availability = person.availibility_json.availability;

      Object.keys(availability).forEach((date) => {
        const slots = availability[date];

        slots.forEach((slot) => {
          const startTime = slot.startTime;
          const endTime = slot.endTime;
          const status = slot.status;

          // Only consider slots with status "available"
          if (status === 'confirmed') {
            // Initialize user_ids array for this time slot if it doesn't exist
            if (!intersection[date]) {
              intersection[date] = [];
            }

            // Check if this time slot exists in the intersection object
            const existingSlot = intersection[date].find(
              (existingSlot) =>
                existingSlot.startTime === startTime &&
                existingSlot.endTime === endTime,
            );

            // If it doesn't exist, add it with the user_id
            if (!existingSlot) {
              intersection[date].push({
                startTime: startTime,
                endTime: endTime,
                user_ids: [person.user_id],
              });
            } else {
              // If it exists, add the user_id to the existing time slot
              existingSlot.user_ids.push(person.user_id);
            }
          }
        });
      });
    }
  });

  // Filter out time slots with less than 2 user_ids
  Object.keys(intersection).forEach((date) => {
    intersection[date] = intersection[date].filter(
      (slot) => slot.user_ids.length >= 1,
    );
  });

  return intersection;
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
  user_ids: string[];
  isSelected?: boolean;
}

export interface IntersectionResult {
  [date: string]: TimeSlot[];
}

export const mailHandler = async ({
  id,
  company_name,
  company_logo,
  candidate_name,
  schedule_name,
  mail,
}: {
  id: string;
  company_name: string;
  company_logo: string;
  candidate_name: string;
  schedule_name: string;
  mail?: string;
}) => {
  try {
    await axios
      .post('/api/sendgrid', {
        fromEmail: `messenger@aglinthq.com`,
        fromName: 'Aglint',
        email: mail ? mail : 'admin@aglinthq.com',
        subject: `You have seletcted for the interview at ${company_name}`,
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
      .then((res) => {
        if (res.status === 200 && res.data.data === 'Email sent') {
          toast.success('Mail sent successfully');
          return true;
        } else {
          toast.error('Unable to send mail. Please try again later.');
          return false;
        }
      });
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
      panel_id_filter: filter.panel_ids?.length > 0 ? filter.panel_ids : null,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    toast.error('Error fetching interview data');
  }
};

export function getNextOrderNumber(
  filterVisible: InterviewSlice['filterVisible'],
) {
  let maxOrderNumber = -Infinity;

  for (const order of Object.values(filterVisible)) {
    if (order > maxOrderNumber) {
      maxOrderNumber = order;
    }
  }

  return maxOrderNumber + 1;
}

export function getScheduleType(
  schedule_type: InterviewScheduleTypeDB['schedule_type'],
) {
  return schedule_type == 'google_meet'
    ? 'Google Meet'
    : schedule_type == 'in_person_meeting'
      ? 'In Person Meeting'
      : schedule_type == 'phone_call'
        ? 'Phone Call'
        : 'Zoom';
}
