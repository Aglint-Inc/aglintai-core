import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import axios from 'axios';

export const scheduleTypes = [
  {
    id: 'schedule',
    display: 'Schedule' as ScheduleType,
  },
  {
    id: 're_schedule',
    display: 'Reschedule' as ScheduleType,
  },
  {
    id: 'cancel',
    display: 'Cancel' as ScheduleType,
  },
];
export type ScheduleType = 'schedule' | 'availability' | 'self-schedule';

type DateRange = {
  start_date: string;
  end_date: string;
} | null;

export type Assignee = 'email' | 'phone' | 'user';

export type ApplicantInfo = {
  applicant_name: string | null;
  job_title: string | null;
  schedule_type: ScheduleType;
  interview_names: string[] | null;
  date_range: DateRange;
  assignee: Assignee;
};

export async function extractDataFromText(text: string) {
  const { data } = await axios.post('/api/ai/queryToJson', {
    // As an AI, your task is to translate recruiters' scheduling requests into the JSON format shown below. When generating schedule times, ensure all appointments are set on business days (Monday through Friday). Here is an example request: "Schedule a first-round interview for John Doe on the next available Friday afternoon." Use this information to create a JSON object that organizes the interview details appropriately, including whether the scheduling should be coordinated via email or phone call.
    prompts: [
      {
        role: 'system',
        content: `
              query is >>> ${text} <<<
              
              set this data to json object
              {
                "applicant_name":"string|null",
                "job_title":"string|null",
                "schedule_type":"schedule(default)|availability|self-schedule",
                "interview_names":"string[]|null",
                "date_range":"{start_date:'MM-DD-YYYY',end_date:'MM-DD-YYYY'}| from today next 7 days by default",
                "assignee":"email|phone|user(default)",
              }
            `,
      },
      {
        role: 'user',
        content: `
              Reference details:
              >>> 
              1) today date is ${dayjsLocal().toString()}
              2) If email or phone is not mentioned, assignee will be user
              <<<
            `,
      },
    ],
  });
  return JSON.parse(data);
}
