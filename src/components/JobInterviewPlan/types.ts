import { PublicJobsType } from '@/src/types/data.types';

export type IntwerviewerPlanType = {
  name: string;
  interv_id: string;
  profile_image: string;
};

export type InterviewModule = {
  module_id: string;
  name: string;
  duration: number;
  selectedIntervs: IntwerviewerPlanType[];
  allIntervs: IntwerviewerPlanType[];
  meetingIntervCnt: number;
  isBreak: boolean;
};

export type InterviewPlanState = {
  modules: InterviewModule[];
  allModules: InterviewModule[];
  isloading: boolean;
  syncStatus: 'saving' | 'saved' | '';
  jobId: string;
  jobTitle: string;
  jobStatus: PublicJobsType['status'];
};

// db Type

export type IntwerviewerPlanDbType = {
  interv_id: string;
};

export type InterviewModuleDbType = {
  module_id: string;
  duration: number;
  selectedIntervs: IntwerviewerPlanDbType[];
  meetingIntervCnt: number;
  isBreak: boolean;
};
