/* eslint-disable no-unused-vars */
import axios from 'axios';

import { ApplicationType } from '@/src/context/CandidateAssessment/types';
import { CandidateType, RecruiterUserType } from '@/src/types/data.types';

export const EmailAgentId = '5acd5b49-a53d-4fc6-9365-ed5c7a7c08c1';
export const PhoneAgentId = '241409e5-45c6-451a-b576-c54388924e76';

export type assigneeType = RecruiterUserType & {
  assignee: 'Agents' | 'Interviewers';
};

export type JobCandidatesType = ApplicationType & {
  candidates: CandidateType;
};

export const agentsDetails = [
  {
    id: EmailAgentId,
    label: 'Email',
  },
  {
    id: PhoneAgentId,
    label: 'Phone',
  },
];

export async function extractDataFromText(
  text: string,
  recruiterUserId: string,
) {
  const { data } = await axios.post('/api/ai/queryToJson', {
    prompts: [
      {
        role: 'system',
        content: `
          ${text}
          set this data to json object
          {
            "name":"extract task name",
            "type":'enum("schedule")',
            "start_date":"if(start_date) extract the date and time ( MM-DD-YYYY HH:mm:ss ) else current date",
            "due_date":"if(due_date) extract the date and time ( MM-DD-YYYY HH:mm:ss ) else current date",
            "schedule_date_range":{
                "start_date":"if(schedule_start_date) extract the date and time ( MM-DD-YYYY HH:mm:ss ) else  current date",
                "end_date":"if(schedule_end_date) extract the date and time ( MM-DD-YYYY HH:mm:ss ) else  current date"
            },
            "agent":"enum('call'|'email'|'phone'|'job'|null)",
            "assignee":"
            if(agent==='phone' || agent==='call')
            return ${PhoneAgentId}
            else if(agent==='email') 
            return ${EmailAgentId}
            else ${recruiterUserId}
            ",
          } 
  
          Reference details:
           today date is ${new Date()}
          `,
      },
    ],
  });
  return JSON.parse(data);
}

// debounce for task update

export type UpdateFunction = (taskId: string, changeValue: string) => void;

export function taskUpdateDebounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
) {
  let timerId: ReturnType<typeof setTimeout> | null;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      func.apply(this, args);
      timerId = null;
    }, delay) as any;
  };
}
