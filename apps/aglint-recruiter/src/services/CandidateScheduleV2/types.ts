import {
  AllSessionIntDetails,
  CompServiceKeyCred,
  InterDetailsType,
  InterviewerMeetingScheduled,
  InterviewSessionApiRespType,
  schedulingSettingType,
  SessionInterviewerApiRespType,
  SessionInterviewerType,
  TimeDurationDayjsType,
  TimeDurationType,
} from '@aglint/shared-types';

import { UserMeetingDetails } from './utils/fetch_details_from_db';

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
  | 'cal_date_events'
  | 'freeTimes'
  | 'work_hours'
  | 'email'
  | 'isCalenderConnected'
> & {
  interviewer_tz: string;
};
export type IntervsWorkHrsEventMapType = Map<string, IntervsWorkHrsEventType>;

export type FuncParams = {
  inter_id: string;
  time_ranges: TimeDurationType[];
};

export type DayjsTimeRange = {
  inter_id: string;
  time_ranges: TimeDurationDayjsType[];
};

export type SlotIntDetails = SessionInterviewerApiRespType & {
  session_id: string;
  curr_day_work_hrs: TimeDurationType[];
};
