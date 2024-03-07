import { PublicJobsType } from '@/src/types/data.types';
// client type
export type IntwerviewerPlanType = {
  name: string;
  interv_id: string;
  profile_image: string;
};

export type InterviewModuleCType = {
  module_id: string;
  name: string;
  duration: number;
  selectedIntervs: IntwerviewerPlanType[];
  allIntervs: IntwerviewerPlanType[];
  meetingIntervCnt: number;
  isBreak: boolean;
};

export type InterviewPlanState = {
  modules: InterviewModuleCType[];
  allModules: InterviewModuleCType[];
  isloading: boolean;
  syncStatus: 'saving' | 'saved' | '';
  jobId: string;
  jobTitle: string;
  jobStatus: PublicJobsType['status'];
};

// db types
export type InterviewerDbType = Pick<InterviewerPlanApiType, 'interv_id'>;

export type InterviewModuleDbType = Pick<
  InterviewModuleApiType,
  'duration' | 'isBreak' | 'meetingIntervCnt' | 'module_id'
> & {
  selectedIntervs: InterviewerDbType[];
};

// api Types
export type InterviewerPlanApiType = {
  interv_id: string;
  profile_img: string;
  name: string;
  email: string;
};

export type InterviewModuleApiType = {
  module_id: string;
  duration: number;
  selectedIntervs: InterviewerPlanApiType[];
  meetingIntervCnt: number;
  isBreak: boolean;
  module_name: string;
};

export type InterviewPlanScheduleDbType = {
  schedule_id: string;
  plan: (Omit<
    InterviewModuleApiType,
    'selectedIntervs' | 'meetingIntervCnt'
  > & {
    start_time: string;
    end_time: string;
    attended_inters: {
      id: string;
      email: string;
      profile_img: string;
      name: string;
    }[];
  })[];
};
