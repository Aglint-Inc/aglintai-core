import { MemberType } from '@/src/context/SchedulingMain/SchedulingMainProvider';
import {
  CandidateType,
  InterviewModuleType,
  InterviewScheduleTypeDB
} from '@/src/types/data.types';

import { SchedulingOptionType } from '../AllSchedules/SchedulingApplication/store';

export type ApiResponse = {
  modules: InterviewModuleType[];
  members: MemberType[];
  schedule: InterviewScheduleTypeDB & {
    confirmed_option: SchedulingOptionType[0] | null;
  };
  schedulingOptions: SchedulingOptionType;
  candidate: CandidateType;
};
