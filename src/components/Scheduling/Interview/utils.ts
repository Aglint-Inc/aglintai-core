import axios from 'axios';

import toast from '@/src/utils/toast';

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
          if (status === 'available') {
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
  mail,
}: {
  id: string;
  mail?: string;
}) => {
  try {
    await axios
      .post('/api/sendgrid', {
        fromEmail: `messenger@aglinthq.com`,
        fromName: 'Aglint',
        email: mail ? mail : 'chinmai@aglinthq.com',
        subject: 'Interview Schedule Confirmation',
        text: `<p>Hi, <br> You have been invited for an interview. Please click on the link to schedule your interview. <br> <a href="${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/invite/${id}">Click here to schedule</a> </p>`,
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
