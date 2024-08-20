/**
 * @abstract Most of the types are only internal to the logic
 *@author Dileep BC
 */

import { Dayjs } from 'dayjs';

import { CalendarEvent, ScheduleAuthType } from './calEvent.types';
import {
  RecruiterUserType,
  InterviewerSessionRelation,
  InterviewSession,
  InterviewModuleType,
  InterviewMeetingTypeDb,
} from '../data.types';
import { schedulingSettingType } from './scheduleSetting';
import { CalConflictType, ConflictReason } from './apiResp.types';

export type PauseJson = {
  start_date: string;
  end_date: string;
  isManual: boolean;
};

export type SessionInterviewerType = Pick<
  RecruiterUserType,
  | 'first_name'
  | 'last_name'
  | 'email'
  | 'profile_image'
  | 'schedule_auth'
  | 'scheduling_settings'
  | 'user_id'
  | 'position'
> &
  Pick<
    InterviewerSessionRelation,
    | 'training_type'
    | 'session_id'
    | 'interviewer_type'
    | 'interview_module_relation_id'
  > & {
    pause_json: PauseJson;
    session_relation_id: string;
  } & {
    int_tz: string;
  };

export type InterviewSessionApiType = {
  session_id: InterviewSession['id'];
  meeting_id: InterviewSession['meeting_id'];
  module_id: InterviewSession['module_id'];
  session_name: InterviewSession['name'];
  duration: InterviewSession['session_duration'];
  location: InterviewSession['location'];
  schedule_type: InterviewSession['schedule_type'];
  session_type: InterviewSession['session_type'];
  qualifiedIntervs: SessionInterviewerType[];
  trainingIntervs: SessionInterviewerType[];
  break_duration: InterviewSession['break_duration'];
  session_order: InterviewSession['session_order'];
  interviewer_cnt: InterviewSession['interviewer_cnt'];
  module_name: InterviewModuleType['name'];
};

export type SessionsCombType = {
  slot_comb_id: string;
  slot_cnt: number;
  sessions: SessionSlotType[];
};

export type SessionSlotType = SessionSlotApiRespType & {
  start_time: string;
  end_time: string;
};

export type SessionSlotApiRespType = Pick<
  InterviewSessionApiType,
  | 'session_id'
  | 'meeting_id'
  | 'session_name'
  | 'duration'
  | 'schedule_type'
  | 'session_type'
  | 'break_duration'
  | 'break_duration'
  | 'session_order'
  | 'interviewer_cnt'
  | 'location'
  | 'module_name'
>;

export type InterviewerMeetingScheduled = {
  meeting_start_time: InterviewMeetingTypeDb['start_time'];
  meeting_id: InterviewMeetingTypeDb['id'];
  int_session_id: InterviewSession['id'];
  meeting_duration: InterviewSession['session_duration'];
  interv_user_id: string;
};
export type MinCalEventDetailTypes = Pick<
  CalendarEvent,
  'id' | 'start' | 'end' | 'organizer' | 'attendees' | 'summary'
> & {
  cal_type: CalConflictType;
};
export type InterDetailsType = {
  full_name: string;
  tokens: ScheduleAuthType | null;
  interviewer_id: string;
  email: string;
  all_events: CalendarEvent[];
  cal_date_events: {
    [cal_date_str: string]: MinCalEventDetailTypes[];
  };
  freeTimes: InterDayFreeTime;
  work_hours: InterDayWorkHr;
  isCalenderConnected: boolean;
  int_schedule_setting: schedulingSettingType;
  day_off: InterDayHolidayOff;
  holiday: InterDayHolidayOff;
};

export type InterDayFreeTime = {
  [curr_date: string]: TimeDurationType[];
};

export type InterDayWorkHr = {
  [curr_date: string]: TimeDurationType[];
};

export type InterDayHolidayOff = {
  [date: string]: TimeDurationType[];
};

export type CompServiceKeyCred = {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
  universe_domain: string;
};

export type TimeDurationType = {
  startTime: string;
  endTime: string;
};

export type TimeDurationDayjsType = {
  startTime: Dayjs;
  endTime: Dayjs;
};

export type IntervCntApp = {
  meet_cnt: number;
  dur_cnt: number;
};

export type AllSessionIntDetails = {
  [session_id: string]: SessionIntDetails;
};
export type SessionIntDetails = {
  session_id: InterviewSession['id'];
  meeting_id: InterviewSession['meeting_id'];
  module_id: InterviewSession['module_id'];
  session_name: InterviewSession['name'];
  duration: InterviewSession['session_duration'];
  location: InterviewSession['location'];
  schedule_type: InterviewSession['schedule_type'];
  session_type: InterviewSession['session_type'];
  break_duration: InterviewSession['break_duration'];
  session_order: InterviewSession['session_order'];
  interviewer_cnt: InterviewSession['interviewer_cnt'];
  module_name: InterviewModuleType['name'];
  interviewers: {
    [user_id: string]: SessionInterviewerType;
  };
};
