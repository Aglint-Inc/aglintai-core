import { Dayjs } from 'dayjs';

import { CalendarEvent, ScheduleAuthType } from './calEvent.types';
import { schedulingSettingType } from './scheduleSetting';

export type InterDetailsType = {
  tokens: ScheduleAuthType | null;
  interviewer_id: string;
  name: string;
  profile_img: string;
  email: string;
  shedule_settings: schedulingSettingType;
  events: CalendarEvent[];
  freeTimes: InterviewFreeTime[];
  isCalenderConnected: boolean;
};

export type InterviewFreeTime = TimeDurationType & {
  // priority: number;
};

export type IntervMeta = Pick<
  InterDetailsType,
  | 'email'
  | 'interviewer_id'
  | 'tokens'
  | 'shedule_settings'
  | 'name'
  | 'profile_img'
>;
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
