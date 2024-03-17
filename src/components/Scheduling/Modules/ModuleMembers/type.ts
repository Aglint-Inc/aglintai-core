import {
  InterviewMeetingTypeDb,
  InterviewMeetingUserTypeDb,
  InterviewScheduleTypeDB,
} from '@/src/types/data.types';

import { MemberType } from '../types';

export type ProgressType = InterviewMeetingUserTypeDb & {
  interview_meeting: InterviewMeetingTypeDb & {
    interview_schedule: InterviewScheduleTypeDB;
  };
};

export type ProgressUserType = {
  user: MemberType;
  progress: ProgressType[];
} | null;

export type PauseType =
  | 'isManual'
  | 'twoWeek'
  | 'oneMonth'
  | 'threeMonth'
  | 'custom';
