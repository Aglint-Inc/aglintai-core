import {
  DatabaseTable,
  PublicJobsType,
  RecruiterDB,
  SessionInterviewerType,
} from '@aglint/shared-types';

import { createMeetingEvents } from './createMeetingEvents';
import { fetchDBScheduleDetails } from './fetchDBScheduleDetails';

export type BookedMeetingDetails = Awaited<
  ReturnType<typeof createMeetingEvents>
>;
export type FetchDBScheduleDetails = Awaited<
  ReturnType<typeof fetchDBScheduleDetails>
>;

export type ConfirmInt = Pick<
  SessionInterviewerType,
  'session_id' | 'user_id' | 'interview_module_relation_id'
>;
export type ScheduleDBDetails = {
  company: Pick<RecruiterDB, 'id' | 'name'>;
  job: Pick<PublicJobsType, 'job_title'>;
  candidate: Pick<DatabaseTable['candidates'], 'first_name' | 'last_name'>;
  application: Pick<DatabaseTable['applications'], 'id'>;
};
