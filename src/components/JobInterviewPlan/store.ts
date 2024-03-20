import { cloneDeep, set } from 'lodash';
import { create } from 'zustand';

import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import {
  InterviewerDbType,
  InterviewModuleDbType,
  InterviewPlanState,
} from './types';
import {
  API_FAIL_MSG,
  supabaseWrap,
} from '../JobsDashboard/JobPostCreateUpdate/utils';

export const initialState: InterviewPlanState = {
  interviewCordinator: null,
  allTeamMembers: [],
  modules: [],
  isloading: true,
  allModules: [],
  syncStatus: '',
  jobId: '',
  jobStatus: 'published',
  jobTitle: '',
};
export const defaultDurations = [
  { name: '10 minutes', value: 10 },
  { name: '15 minutes', value: 15 },
  { name: '20 minutes', value: 20 },
  { name: '30 minutes', value: 30 },
  { name: '45 minutes', value: 45 },
  { name: '1 hour', value: 60 },
  { name: '1 hour 30 minutes', value: 90 },
  { name: '2 Hour', value: 120 },
];

export const useInterviewPlan = create<InterviewPlanState>()(() => ({
  ...initialState,
}));

export const initilizeIntPlan = (state: InterviewPlanState) => {
  useInterviewPlan.setState({ ...state });
};

export const setModules = (modules: InterviewPlanState['modules']) => {
  useInterviewPlan.setState({ modules });
};

export const handleUpdateDb = async ({
  path,
  value,
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

    let dbModules: InterviewModuleDbType[] = [];

    for (let clModule of clonedState.modules) {
      let dbModule: InterviewModuleDbType = {
        session_name: clModule.session_name,
        shadowIntervs: clModule.shadowIntervs.map((i) => ({
          interv_id: i.interv_id,
        })),
        revShadowInterv: clModule.revShadowIntervs.map((i) => ({
          interv_id: i.interv_id,
        })),
        meeting_type: clModule.meeting_type,
        duration: clModule.duration,
        isBreak: clModule.isBreak,
        meetingIntervCnt: clModule.meetingIntervCnt,
        module_id: clModule.module_id,
        selectedIntervs: clModule.selectedIntervs.map((s) => ({
          interv_id: s.interv_id,
        })),
      };
      dbModules.push(dbModule);
    }
    let cordinator: InterviewerDbType = null;
    if (clonedState.interviewCordinator) {
      cordinator = {
        interv_id: clonedState.interviewCordinator.interv_id,
      };
    }
    supabaseWrap(
      await supabase
        .from('public_jobs')
        .update({
          interview_plan: {
            plan: dbModules,
            coordinator: cordinator,
          },
        })
        .eq('id', clonedState.jobId),
    );
    useInterviewPlan.setState((prevState) => {
      clonedState = cloneDeep(prevState);
      clonedState.syncStatus = 'saved';
      return clonedState;
    });
  } catch (err) {
    toast.error(API_FAIL_MSG);
  }
};
