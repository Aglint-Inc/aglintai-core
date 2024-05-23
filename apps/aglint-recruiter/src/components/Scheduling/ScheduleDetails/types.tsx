import {
  InterviewMeetingTypeDb,
  InterviewModuleType,
  InterviewSessionRelationTypeDB,
  InterviewSessionTypeDB,
} from '@aglint/shared-types';
import { schedulingSettingType } from '@aglint/shared-types';

import { ScheduleType } from '../InterviewTypes/types';

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
  hiring_manager: UserType;
  interview_coordinator: UserType;
  recruiter: UserType;
  recruiting_coordinator: UserType;
  sourcer: UserType;
  organizer: UserType;
};

type UserType = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_image: string;
  position: string;
};
