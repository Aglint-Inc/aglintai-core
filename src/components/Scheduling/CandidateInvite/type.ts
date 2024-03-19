import {
  CandidateType,
  InterviewMeetingTypeDb,
  InterviewModuleType,
  InterviewScheduleTypeDB
} from '@/src/types/data.types';

import { SchedulingOptionType } from '../AllSchedules/SchedulingApplication/store';
import { ApplicationList } from '../AllSchedules/store';
import { MemberType } from '../Modules/types';

export type ApiResponse = {
  job: ApplicationList['public_jobs'];
  modules: InterviewModuleType[];
  members: MemberType[];
  schedule: InterviewScheduleTypeDB & {
    confirmed_option: SchedulingOptionType[0] | null;
  };
  schedulingOptions: SchedulingOptionType;
  candidate: CandidateType;
  recruiter: {
    id: string;
    logo: string;
    name: string;
  };
  meetings: InterviewMeetingTypeDb[];
};
