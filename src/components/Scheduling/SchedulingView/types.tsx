import {
  InterviewMeetingTypeDb,
  InterviewModuleType,
  InterviewSessionRelationTypeDB,
  InterviewSessionTypeDB,
} from '@/src/types/data.types';
import { schedulingSettingType } from '@/src/types/scheduleTypes/scheduleSetting';

import { ScheduleType } from '../Modules/types';

export type ScheduleMeeting = ScheduleType & {
  interview_meeting: InterviewMeetingTypeDb;
  interview_session: InterviewSessionTypeDB;
  interview_module: InterviewModuleType;
  users: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    profile_image: string;
    position: string;
    department: string;
    interview_session_relation: InterviewSessionRelationTypeDB;
    location: string;
    scheduling_settings: schedulingSettingType;
    weekly_meetings: {
      start_time: string;
      end_time: string;
    }[];
  }[];
  coordinator: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    profile_image: string;
    position: string;
  };
};
