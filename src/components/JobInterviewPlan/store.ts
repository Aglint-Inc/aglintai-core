import { cloneDeep, set } from 'lodash';
import { create } from 'zustand';

import { PublicJobsType } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import {
  API_FAIL_MSG,
  supabaseWrap
} from '../JobsDashboard/JobPostCreateUpdate/utils';

type IntwerviewerPlanType = {
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

export const initialState: InterviewPlanState = {
  modules: [],
  isloading: true,
  allModules: [],
  syncStatus: '',
  jobId: '',
  jobStatus: '',
  jobTitle: ''
};
export const defaultDurations = [
  { name: '30 minutes', value: 30 },
  { name: '45 minutes', value: 45 },
  { name: '1 hour', value: 60 },
  { name: '1 hour 30 minutes', value: 90 },
  { name: '2 Hour', value: 120 }
];

export const useInterviewPlan = create<InterviewPlanState>()(() => ({
  ...initialState
}));

export const initilizeIntPlan = (state: InterviewPlanState) => {
  useInterviewPlan.setState({ ...state });
};

export const setModules = (modules: InterviewPlanState['modules']) => {
  useInterviewPlan.setState({ modules });
};

export const handleUpdateDb = async ({
  path,
  value
}: {
  path: string;
  value: any;
}) => {
  try {
    let clonedState: InterviewPlanState;
    useInterviewPlan.setState((prevState) => {
      clonedState = cloneDeep(prevState);
      clonedState.syncStatus = 'saving';
      set(clonedState, path, value);
      return clonedState;
    });
    supabaseWrap(
      await supabase
        .from('public_jobs')
        .update({
          interview_plan: {
            plan: clonedState.modules
          }
        })
        .eq('id', clonedState.jobId)
    );
    useInterviewPlan.setState((prevState) => {
      clonedState = cloneDeep(prevState);
      clonedState.syncStatus = 'saved';
      return clonedState;
    });
  } catch (err) {
    toast.toast.error(API_FAIL_MSG);
  }
};
