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
import { Dayjs } from 'dayjs';

import { UserMeetingDetails } from './utils/dbFetchScheduleApiDetails';

export type ScheduleDBDetailsParams = {
  session_ids: string[];
  company_id: string;
  start_date_str: string;
  end_date_str: string;
  req_user_tz: string;
};

export type ScheduleApiDetails = {
  req_user_tz: string;
  company_cred: CompServiceKeyCred;
  ses_with_ints: InterviewSessionApiRespType[];
  all_inters: SessionInterviewerType[];
  comp_schedule_setting: schedulingSettingType;
  int_meetings: InterviewerMeetingScheduled[];
  ints_schd_meetings: UserMeetingDetails;
  all_session_int_details: AllSessionIntDetails;
  schedule_dates: {
    user_start_date_js: Dayjs;
    user_end_date_js: Dayjs;
  };
};

export type IntervsWorkHrsEventType = Pick<
  InterDetailsType,
  | 'cal_date_events'
  | 'freeTimes'
  | 'work_hours'
  | 'email'
  | 'isCalenderConnected'
  | 'day_off'
  | 'holiday'
  | 'int_schedule_setting'
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
