import { PublicJobsType } from '@/src/types/data.types';

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

// db Type

export type IntwerviewerPlanDbType = {
  interv_id: string;
  profile_img?: string;
  name?: string;
  email?: string;
};

export type InterviewModuleDbType = {
  module_id: string;
  duration: number;
  selectedIntervs: IntwerviewerPlanDbType[];
  meetingIntervCnt: number;
  isBreak: boolean;
  module_name?: string;
};

export type InterviewPlanScheduleDbType = {
  schedule_id: string;
  plan: (Omit<InterviewModuleDbType, 'selectedIntervs' | 'meetingIntervCnt'> & {
    start_time: string;
    end_time: string;
    attended_inters: {
      id: string;
      email: string;
      profile_img: string;
    }[];
  })[];
};
