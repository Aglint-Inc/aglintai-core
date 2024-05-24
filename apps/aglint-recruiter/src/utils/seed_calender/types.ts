/* eslint-disable no-unused-vars */
export enum MeetingTypeEnum {
  OtherMeetings = 'other_meetings',
  Interview = 'interview',
  OOO = 'ooo', // Out of Office
  FreeTime = 'free_time',
  SoftConflicts = 'soft_conflicts',
  RecruiterBlock = 'recruiter_block',
  NOMeeting = 'NOMeeting',
}

export interface RandMeetingType {
  type: MeetingTypeEnum;
  duration: number;
}

export interface MeetingLimit {
  maxOccurrences: number;
  period: 'day' | 'month';
}

export interface MeetingCount {
  occ_cnt: number;
  // period: 'day' | 'month';
}
// Type for the configuration object
export type MeetingLimitsConfig = Record<MeetingTypeEnum, MeetingCount>;
