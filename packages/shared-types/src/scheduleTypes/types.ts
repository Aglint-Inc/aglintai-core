/**
 * @abstract Most of the types are only internal to the logic
 *@author Dileep BC
 */

import { Dayjs } from 'dayjs';

import {
  InterviewerSessionRelation,
  InterviewMeetingTypeDb,
  InterviewModuleType,
  InterviewSession,
  RecruiterUserType,
} from '@/src/types/data.types';

import { CalendarEvent, ScheduleAuthType } from './calEvent.types';
import { schedulingSettingType } from './scheduleSetting';

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
> &
  Pick<
    InterviewerSessionRelation,
    | 'training_type'
    | 'session_id'
    | 'interviewer_type'
    | 'interview_module_relation_id'
  > & {
    pause_json: PauseJson;
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

export type SessionSlotApiRespType = {
  session_id: InterviewSession['id'];
  session_name: InterviewSession['name'];
  duration: InterviewSession['session_duration'];
  schedule_type: InterviewSession['schedule_type'];
  session_type: InterviewSession['session_type'];
  break_duration: InterviewSession['break_duration'];
  session_order: InterviewSession['session_order'];
  interviewer_cnt: InterviewSession['interviewer_cnt'];
  location: InterviewSession['location'];
  module_name: InterviewModuleType['name'];
};

export type InterviewerMeetingScheduled = {
  meeting_start_time: InterviewMeetingTypeDb['start_time'];
  meeting_id: InterviewMeetingTypeDb['id'];
  int_session_id: InterviewSession['id'];
  meeting_duration: InterviewSession['session_duration'];
  interv_user_id: string;
};

export type InterDetailsType = {
  tokens: ScheduleAuthType | null;
  interviewer_id: string;
  email: string;
  events: CalendarEvent[];
  freeTimes: InterviewFreeTime[];
  isCalenderConnected: boolean;
  int_schedule_setting: schedulingSettingType;
};

export type InterviewFreeTime = TimeDurationType & {
  // priority: number;
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
