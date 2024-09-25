import type {
  DatabaseEnums,
  schedulingSettingType,
} from '@aglint/shared-types';

export type InterviewDateRangeType =
  | 'today'
  | 'tomorrow'
  | 'last_7_days'
  | 'last_30_days'
  | 'next_7_days'
  | 'next_30_days'
  | 'date_range';

export type ScheduleFilerType = {
  status: DatabaseEnums['interview_schedule_status'][];
  interviewers: string[];
  jobs: string[];
  schedule_types: string[];
  date: InterviewDateRangeType[];
  session_types: DatabaseEnums['session_type'][];
  searchText: string;
};
export const initialFilterState: ScheduleFilerType = {
  status: ['completed'],
  interviewers: [],
  jobs: [],
  schedule_types: [],
  date: [],
  session_types: [],
  searchText: '',
};
export const upComingInitialFilterState: ScheduleFilerType = {
  status: ['confirmed'],
  interviewers: [],
  jobs: [],
  schedule_types: [],
  date: [],
  session_types: [],
  searchText: '',
};

import { type ReactNode } from 'react';

export type FilterOptionsType = {
  name:
    | 'status'
    | 'interviewer'
    | 'candidate'
    | 'date_range'
    | 'schedule_type'
    | 'job';
  Icon: ReactNode;
};

export type ScheduleListType = {
  interview_meeting: {
    end_time: string;
    job_id: string;
    job_title: string;
    schedule_type: DatabaseEnums['interview_schedule_type'];
    session_duration: number;
    session_name: string;
    start_time: string;
    status: DatabaseEnums['interview_schedule_status'];
    meeting_id: string;
    module_id: string;
  };
  users: {
    email: string;
    first_name: string;
    id: string;
    last_name: string;
    location: string;
    position: string;
    profile_image: string;
    scheduling_settings: schedulingSettingType;
    training_type: DatabaseEnums['interviewer_type'];
    is_confirmed: boolean;
    weekly_meetings: {
      end_time: string;
      duration: number;
      start_time: string;
    }[];
    accepted_status: DatabaseEnums['session_accepted_status'];
  }[];
  candidate: {
    candidate_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    application_id: string;
  };
}[];
