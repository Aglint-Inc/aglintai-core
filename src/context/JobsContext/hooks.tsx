import { useAuthDetails } from '@context/AuthContext/AuthContext';
import toast from '@utils/toast';
import { useEffect, useReducer } from 'react';

import { InputData, Job, JobsData } from './types';
import {
  createJobDbAction,
  deleteJobDbAction,
  readJobDbAction,
  updateJobDbAction,
} from './utils';

// eslint-disable-next-line no-unused-vars
enum ActionType {
  // eslint-disable-next-line no-unused-vars
  CREATE,
  // eslint-disable-next-line no-unused-vars
  READ,
  // eslint-disable-next-line no-unused-vars
  UPDATE,
  // eslint-disable-next-line no-unused-vars
  DELETE,
}

type Action =
  | {
      type: ActionType.CREATE;
      payload: {
        inputData: Job;
      };
    }
  | {
      type: ActionType.READ;
      payload: {
        inputData: Job[];
      };
    }
  | {
      type: ActionType.UPDATE;
      payload: {
        id: string;
        inputData: Job;
      };
    }
  | {
      type: ActionType.DELETE;
      payload: { id: string };
    };

const reducer = (state: JobsData, action: Action) => {
  switch (action.type) {
    case ActionType.CREATE: {
      const newState: JobsData = {
        ...state,
        jobs: [...state.jobs, action.payload.inputData],
      };
      return newState;
    }

    case ActionType.READ: {
      const newState: JobsData = {
        ...state,
        jobs: [...action.payload.inputData],
      };
      return newState;
    }

    case ActionType.UPDATE: {
      const newJobs: Job[] = state.jobs.reduce((jobs, job) => {
        if (job.id === action.payload.id) jobs.push(action.payload.inputData);
        else jobs.push(job);
        return jobs;
      }, []);
      const newState: JobsData = {
        ...state,
        jobs: newJobs,
      };
      return newState;
    }

    case ActionType.DELETE: {
      const newJobs: Job[] = state.jobs.filter(
        (job) => job.id !== action.payload.id,
      );
      const newState: JobsData = {
        ...state,
        jobs: newJobs,
      };
      return newState;
    }

    default: {
      return state;
    }
  }
};

const useJobActions = () => {
  const { recruiter } = useAuthDetails();

  const [jobsData, dispatch] = useReducer(reducer, undefined);
  const initialLoad = recruiter?.id && jobsData ? true : false;

  const handleJobCreate = async (inputData: InputData) => {
    if (recruiter) {
      const { data, error } = await createJobDbAction(recruiter.id, inputData);
      if (data) {
        const action: Action = {
          type: ActionType.CREATE,
          payload: { inputData: data[0] },
        };
        dispatch(action);
        return true;
      }
      handleJobError(error);
      return false;
    }
  };

  const handleJobRead = async () => {
    if (recruiter) {
      const { data, error } = await readJobDbAction(recruiter.id);
      if (data) {
        const action: Action = {
          type: ActionType.READ,
          payload: { inputData: data },
        };
        dispatch(action);
        return true;
      }
      handleJobError(error);
      return false;
    }
  };

  const handleJobUpdate = async (jobId: string, inputData: InputData) => {
    if (recruiter) {
      const { data, error } = await updateJobDbAction(jobId, inputData);
      if (data) {
        const action: Action = {
          type: ActionType.UPDATE,
          payload: {
            id: jobId,
            inputData: data[0],
          },
        };
        dispatch(action);
        return true;
      }
      handleJobError(error);
      return false;
    }
  };

  const handleJobDelete = async (jobId: string) => {
    if (recruiter) {
      const { data, error } = await deleteJobDbAction(jobId);
      if (data) {
        const action: Action = {
          type: ActionType.DELETE,
          payload: {
            id: jobId,
          },
        };
        dispatch(action);
        return true;
      }
      handleJobError(error);
      return false;
    }
  };

  const handleJobError = (error) => {
    toast.error(`Oops! Something went wrong.\n ${error?.message}`);
  };

  useEffect(() => {
    handleJobRead();
  }, [recruiter?.id]);

  const value = {
    jobsData,
    handleJobCreate,
    handleJobRead,
    handleJobUpdate,
    handleJobDelete,
    handleJobError,
    initialLoad,
  };

  return value;
};

export default useJobActions;
