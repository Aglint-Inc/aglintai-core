import { useAuthDetails } from '@context/AuthContext/AuthContext';
import toast from '@utils/toast';
import { useEffect, useReducer } from 'react';

import { Job, JobsData } from './types';
import {
  deleteJobDbAction,
  readJobsDbAction,
  updateJobDbAction,
} from './utils';

// eslint-disable-next-line no-unused-vars
enum actionType {
  // eslint-disable-next-line no-unused-vars
  CREATE,
  // eslint-disable-next-line no-unused-vars
  READ,
  // eslint-disable-next-line no-unused-vars
  UPDATE,
  // eslint-disable-next-line no-unused-vars
  DELETE,
}

type action =
  | {
      type: actionType.CREATE;
      payload: { id: string };
    }
  | {
      type: actionType.READ;
      payload: Job[];
    }
  | {
      type: actionType.UPDATE;
      payload: {
        id: string;
        inputData: Partial<Omit<Job, 'id' | 'recruiter_id'>>;
      };
    }
  | {
      type: actionType.DELETE;
      payload: { id: string };
    };

const reducer = (state: JobsData, action: action) => {
  switch (action.type) {
    case actionType.CREATE: {
      return state;
    }
    case actionType.READ: {
      const newState: JobsData = {
        ...state,
        jobs: action.payload,
      };
      return newState;
    }
    default: {
      return state;
    }
  }
};

export const useJobActions = () => {
  const { recruiter } = useAuthDetails();

  const [jobsData, dispatch] = useReducer(reducer, undefined);
  const initialLoad = recruiter?.id && jobsData ? true : false;

  const handleJobCreate = async () => {
    if (recruiter) {
      const { data, error } = await readJobsDbAction(recruiter.id);
      if (data) {
        const action: action = {
          type: actionType.READ,
          payload: data,
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
      const { data, error } = await readJobsDbAction(recruiter.id);
      if (data) {
        const action: action = {
          type: actionType.READ,
          payload: data,
        };
        dispatch(action);
        return true;
      }
      handleJobError(error);
      return false;
    }
  };

  const handleJobUpdate = async (
    jobId: string,
    inputData: Partial<Omit<Job, 'id' | 'recruiter_id'>>,
  ) => {
    if (recruiter) {
      const { data, error } = await updateJobDbAction(jobId, inputData);
      if (data) {
        const action: action = {
          type: actionType.UPDATE,
          payload: {
            id: jobId,
            inputData,
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
        const action: action = {
          type: actionType.DELETE,
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
    toast.error('Oops! Something went wrong.');
    // eslint-disable-next-line no-console
    console.log('❌', error, '❌');
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
