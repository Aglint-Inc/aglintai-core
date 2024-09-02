import {
  type DatabaseTable,
  type PublicJobsType,
  type RecruiterDB,
  type SessionInterviewerType,
} from '@aglint/shared-types';

import { type createMeetingEvents } from './createMeetingEvents';
import { type fetchCandDetailsForDebreifBooking } from './dbFetch/fetchCandDetailsForDebreifBooking';
import { type fetchCandAvailForBooking } from './dbFetch/fetchCandidateAvailability';
import { type fetchDBScheduleDetails } from './dbFetch/fetchDBScheduleDetails';

export type BookedMeetingDetails = Awaited<
  ReturnType<typeof createMeetingEvents>
>;
export type FetchDBScheduleDetails = Awaited<
  ReturnType<typeof fetchDBScheduleDetails>
>;

export type FetchedCandAvailType = Awaited<
  ReturnType<typeof fetchCandAvailForBooking>
>;

export type FetchedDebreifType = Awaited<
  ReturnType<typeof fetchCandDetailsForDebreifBooking>
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
