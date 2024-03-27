import {
  CandidateType,
  InterviewMeetingTypeDb,
  InterviewModuleType,
  InterviewScheduleTypeDB,
} from '@/src/types/data.types';

import { InterviewPlanScheduleDbType } from '../../JobInterviewPlan/types';
import { ApplicationList } from '../AllSchedules/store';
import { MemberType } from '../Modules/types';

export type ApiResponse = {
  job: ApplicationList['public_jobs'];
  modules: InterviewModuleType[];
  members: MemberType[];
  schedule: InterviewScheduleTypeDB & {
    confirmed_option: InterviewPlanScheduleDbType;
  };
  schedulingOptions: InterviewPlanScheduleDbType[];
  candidate: CandidateType;
  recruiter: {
    id: string;
    logo: string;
    name: string;
  };
  meetings: InterviewMeetingTypeDb[];
};
