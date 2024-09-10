import { DatabaseEnums } from '@aglint/shared-types';

import { InterviewDateRangeType } from './types';

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
  status: ['confirmed', 'completed'],
  interviewers: [],
  jobs: [],
  schedule_types: [],
  date: [],
  session_types: [],
  searchText: null,
};
