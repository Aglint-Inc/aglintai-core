import axios from 'axios';
import React from 'react';

import dayjs from '@/src/utils/dayjs';

/* eslint-disable no-unused-vars */
export const scheduleType = [
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

export type MentionInputProps = {
  value?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue: string,
    newPlainTextValue: string,
    mentions: MentionType[],
  ) => void;
  onKeyDown?: (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  singleLine?: boolean;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    clickedSuggestion: boolean,
  ) => void;
  onFocus?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  allowSpaceInQuery?: boolean;
  suggestionsPortalHost?: HTMLElement;
  inputRef?: React.RefObject<HTMLInputElement | HTMLTextAreaElement>;
  allowSuggestionsAboveCursor?: boolean;
  forceSuggestionsAboveCursor?: boolean;
  a11ySuggestionsListLabel?: string;
  customSuggestionsContainer?: (children: React.ReactNode) => React.ReactNode;
  className?: string;
  placeholder?: string;
  style?: {
    control?: React.CSSProperties;
    highlighter?: React.CSSProperties;
    input?: React.CSSProperties;
    suggestions?: React.CSSProperties;
  };
};

export type MentionType = {
  id: string;
  display: string;
};

export interface MentionComponentProps {
  trigger: string | RegExp;
  data:
    | MentionType[]
    | ((search: string, callback: (data: MentionType[]) => void) => void);
  renderSuggestion?: (
    entry: MentionType,
    search: string,
    highlightedDisplay: React.ReactNode,
    index: number,
    focused: boolean,
  ) => React.ReactNode;
  markup?: string;
  displayTransform?: (id: string, display: string) => string;
  regex?: RegExp;
  onAdd?: (
    id: string,
    display: string,
    startPos: number,
    endPos: number,
  ) => void;
  appendSpaceOnAdd?: boolean;
  style?: React.CSSProperties;
}

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
            1) today date is ${dayjs().toString()}
            2) If email or phone is not mentioned, assignee will be user
            <<<
          `,
      },
    ],
  });
  return JSON.parse(data);
}

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
