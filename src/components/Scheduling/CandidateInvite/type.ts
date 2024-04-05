import { DateRangeCandidateInvite } from '@/src/pages/api/scheduling/invite';
import {
  CandidateType,
  InterviewMeetingTypeDb,
  InterviewScheduleTypeDB,
  InterviewSession,
} from '@/src/types/data.types';

import { ApplicationList } from '../AllSchedules/store';

export type ApiResponse = {
  job: ApplicationList['public_jobs'];
  schedule: InterviewScheduleTypeDB;
  dateRange: DateRangeCandidateInvite[];
  candidate: CandidateType;
  recruiter: {
    id: string;
    logo: string;
    name: string;
  };
  meetings: {
    interview_session: InterviewSession;
    interview_meeting: InterviewMeetingTypeDb;
  }[];
  numberOfDays: number;
};
