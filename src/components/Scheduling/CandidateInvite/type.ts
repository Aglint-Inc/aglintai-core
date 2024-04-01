import {
  CandidateType,
  InterviewScheduleTypeDB
} from '@/src/types/data.types';
import { PlanCombinationType } from '@/src/utils/scheduling_v1/types';

import { SessionsType } from '../AllSchedules/SchedulingApplication/types';
import { ApplicationList } from '../AllSchedules/store';

export type ApiResponse = {
  job: ApplicationList['public_jobs'];
  schedule: InterviewScheduleTypeDB;
  schedulingOptions: PlanCombinationType[];
  candidate: CandidateType;
  recruiter: {
    id: string;
    logo: string;
    name: string;
  };
  meetings: SessionsType;
};
