import { PublicJobsType } from '@/src/types/data.types';
// client type
export type IntwerviewerPlanType = {
  name: string;
  interv_id: string;
  profile_image: string;
};

export type InterviewSession = {
  module_id: string;
  module_name: string;
  session_name: string;
  duration: number;
  selectedIntervs: IntwerviewerPlanType[];
  shadowIntervs: InterviewerPlanApiType[];
  training_ints: InterviewerPlanApiType[];
  revShadowIntervs: InterviewerPlanApiType[];
  allIntervs: IntwerviewerPlanType[];
  meetingIntervCnt: number;
  isBreak: boolean;
};

export type InterviewPlanState = {
  modules: InterviewSession[];
  allModules: InterviewSession[];
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
  'duration' | 'isBreak' | 'meetingIntervCnt' | 'module_id' | 'session_name'
> & {
  selectedIntervs: InterviewerDbType[];
  shadowIntervs: InterviewerDbType[];
  revShadowInterv: InterviewerDbType[];
};

// api Types
export type InterviewerPlanApiType = {
  interv_id: string;
  profile_img: string;
  name: string;
  email: string;
  pause_json: {
    start_date: string;
    end_date: string;
    isManual: boolean;
  } | null;
};

export type InterviewModuleApiType = {
  module_id: string;
  module_name: string;
  session_name: string;
  duration: number;
  selectedIntervs: InterviewerPlanApiType[];
  shadowIntervs: InterviewerPlanApiType[];
  revShadowIntervs: InterviewerPlanApiType[];
  meetingIntervCnt: number;
  isBreak: boolean;
};

export type InterviewPlanScheduleDbType = {
  id: string;
  plans: (Pick<
    InterviewModuleApiType,
    | 'selectedIntervs'
    | 'duration'
    | 'isBreak'
    | 'module_id'
    | 'module_name'
    | 'revShadowIntervs'
    | 'session_name'
    | 'shadowIntervs'
  > & {
    start_time: string;
    end_time: string;
  })[];
};
