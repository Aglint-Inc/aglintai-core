import {
  AllSessionIntDetails,
  CompServiceKeyCred,
  InterDetailsType,
  InterviewerMeetingScheduled,
  InterviewSessionApiRespType,
  schedulingSettingType,
  SessionInterviewerType,
} from '@aglint/shared-types';

import { UserMeetingDetails } from '../CandidateSchedule/utils/fetch_details_from_db';

export type DBDetailsType = {
  company_cred: CompServiceKeyCred;
  ses_with_ints: InterviewSessionApiRespType[];
  all_inters: SessionInterviewerType[];
  comp_schedule_setting: schedulingSettingType;
  int_meetings: InterviewerMeetingScheduled[];
  ints_schd_meetings: Map<string, UserMeetingDetails[]>;
  all_session_int_details: AllSessionIntDetails;
};

export type IntervsWorkHrsEventType = Pick<
  InterDetailsType,
  'events' | 'freeTimes' | 'work_hours' | 'email'
>;
export type IntervsWorkHrsEventMapType = Map<string, IntervsWorkHrsEventType>;
