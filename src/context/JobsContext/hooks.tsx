import { useAuthDetails } from '@context/AuthContext/AuthContext';
import toast from '@utils/toast';
import { useEffect, useReducer } from 'react';

import { JobApplcationDB } from '@/src/types/data.types';

import { InputData, Job, JobsData, Status } from './types';
import {
  createJobDbAction,
  deleteJobDbAction,
  initialJobContext,
  readJobDbAction,
} from './utils';
import { readJobApplicationDbAction } from '../JobApplicationsContext/utils';

// eslint-disable-next-line no-unused-vars
enum ActionType {
  // eslint-disable-next-line no-unused-vars
  CREATE,
  // eslint-disable-next-line no-unused-vars
  READ,
  // eslint-disable-next-line no-unused-vars
  READAPPLICATION,
  // eslint-disable-next-line no-unused-vars
  UPDATE,
  // eslint-disable-next-line no-unused-vars
  DELETE,
}

type Action =
  | {
      type: ActionType.CREATE;
      payload: {
        jobData: Job;
      };
    }
  | {
      type: ActionType.READ;
      payload: {
        jobsData: Job[];
      };
    }
  | {
      type: ActionType.UPDATE;
      payload: {
        jobData: Job[];
      };
    }
  | {
      type: ActionType.DELETE;
      payload: { jobId: string };
    }
  | {
      type: ActionType.READAPPLICATION;
      payload: { applicationData: JobApplcationDB[] };
    };

const reducer = (state: JobsData, action: Action) => {
  switch (action.type) {
    case ActionType.CREATE: {
      const newState: JobsData = {
        ...state,
        jobs: [...state.jobs, action.payload.jobData],
      };
      return newState;
    }

    case ActionType.READ: {
      const newState: JobsData = {
        ...state,
        jobs: [...action.payload.jobsData],
      };
      return newState;
    }

    case ActionType.UPDATE: {
      const newState: JobsData = {
        ...state,
        jobs: action.payload.jobData,
      };
      return newState;
    }

    case ActionType.DELETE: {
      const newJobs: Job[] = state.jobs.filter(
        (job) => job.id !== action.payload.jobId,
      );
      const newState: JobsData = {
        ...state,
        jobs: newJobs,
      };
      return newState;
    }

    case ActionType.READAPPLICATION: {
      const newState: JobsData = {
        ...state,
        applications: action.payload.applicationData,
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

  const [jobsData, dispatch] = useReducer(reducer, initialJobContext.jobsData);
  const initialLoad =
    recruiter?.id && jobsData.jobs && jobsData.applications ? true : false;

  const handleJobCreate = async (inputData: InputData) => {
    if (recruiter) {
      const { data, error } = await createJobDbAction(recruiter.id, inputData);
      if (data) {
        const action: Action = {
          type: ActionType.CREATE,
          payload: { jobData: data[0] },
        };
        dispatch(action);
        return data[0];
      }
      handleJobError(error);
      return undefined;
    }
  };

  const handleJobRead = async () => {
    if (recruiter) {
      const { data, error } = await readJobDbAction(recruiter.id);
      if (data) {
        const fechedJobs = data.map((job) => {
          return { ...job, status: job.status as unknown as Status };
        });
        const action: Action = {
          type: ActionType.READ,
          payload: { jobsData: fechedJobs },
        };
        dispatch(action);
        return true;
      }
      handleJobError(error);
      return false;
    }
  };

  const handleApplicationsRead = async () => {
    if (recruiter) {
      const { data, error } = await readJobApplicationDbAction(recruiter.id);
      if (data) {
        const action: Action = {
          type: ActionType.READAPPLICATION,
          payload: { applicationData: data },
        };
        dispatch(action);
        return true;
      }
      handleJobError(error);
      return false;
    }
  };

  const handleJobUpdate = async (inputData: Job[]) => {
    if (recruiter) {
      // const { data, error } = await updateJobDbAction(inputData, recruiter.id);
      if (inputData) {
        const action: Action = {
          type: ActionType.UPDATE,
          payload: {
            jobData: inputData,
          },
        };
        dispatch(action);
        return true;
      }
      // handleJobError(error);
      return undefined;
    }
  };

  const handleJobDelete = async (jobId: string) => {
    if (recruiter) {
      const { data, error } = await deleteJobDbAction(jobId);
      if (data) {
        const action: Action = {
          type: ActionType.DELETE,
          payload: {
            jobId,
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
    handleApplicationsRead();
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
