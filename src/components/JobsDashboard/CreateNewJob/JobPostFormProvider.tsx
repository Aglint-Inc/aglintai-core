import { cloneDeep, set } from 'lodash';
import React, { createContext, useContext, useReducer } from 'react';

type JobType = {
  id: string;
  jobTitle: string;
  company: string;
  workPlaceType: string;
  jobLocation: string;
  jobType: string;
  applicantsCount: number;
  interviewingCount: number;
  shortListedCount: number;
  jobDescription: string;
  skills: string[];
  status: 'sourcing' | 'interviewing' | 'closed' | 'draft';
  interviewType: 'ai-powered' | 'questions-preset';
};

export type JobsState = {
  editingJob: {
    job: JobType;
    formType: 'edit' | 'new';
  } | null;
};

const initialState: JobsState = {
  editingJob: null,
};

// Define action types
type JobsAction =
  | {
      type: 'editJob';
      payload: {
        path: string;
        value: string | JobType;
      };
    }
  | {
      type: 'addJob';
      payload: {
        newJob: JobType;
      };
    }
  | {
      type: 'removeJob';
      payload: {
        jobId: string;
      };
    }
  | {
      type: 'initForm';
      payload: {
        formType: JobsState['editingJob']['formType'];
        payload: JobType;
      };
    }
  | {
      type: 'setJobdetails';
      payload: {
        path: string;
        value: any;
      };
    }
  | null;

const jobsReducer = (state: JobsState, action: JobsAction): JobsState => {
  switch (action.type) {
    case 'editJob': {
      const newState: JobsState = cloneDeep(state);
      const { path, value } = action.payload;
      set(newState.editingJob, path, value);
      return newState;
    }
    case 'setJobdetails': {
      const newState: JobsState = cloneDeep(state);
      const { path, value } = action.payload;
      set(newState.editingJob.job, path, value);
      return newState;
    }

    case 'initForm': {
      const { formType, payload } = action.payload;
      const newState: JobsState = cloneDeep(state);
      set(newState, 'editingJob.formType', formType);
      set(newState, 'editingJob.job', payload);
      return newState;
    }
    // case 'changeFilter':{
    // const { newFilter } = action.payload;
    //   const newState: JobsState = cloneDeep(state);
    //   set(newState,'filter','')
    //   return newState
    // }
    // case 'removeJob'

    default:
      return state;
  }
};

export type JobsContextType = {
  jobs: JobsState;
  dispatch: React.Dispatch<JobsAction>;
};
const initialContextValue: JobsContextType = {
  jobs: initialState,
  dispatch: () => {},
};

const JobsCtx = createContext<JobsContextType>(initialContextValue);

export const useJobList = () => {
  return useContext(JobsCtx);
};

const JobPostFormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(jobsReducer, initialState);
  return (
    <JobsCtx.Provider value={{ jobs: state, dispatch }}>
      {children}
    </JobsCtx.Provider>
  );
};

export default JobPostFormProvider;
