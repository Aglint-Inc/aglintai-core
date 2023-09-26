import { useAuthDetails } from '@context/AuthContext/AuthContext';
import toast from '@utils/toast';
import { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';

import { InputData, JobApplication, JobApplicationsData } from './types';
import {
  createJobApplicationDbAction,
  deleteJobApplicationDbAction,
  readJobApplicationDbAction,
  updateJobApplicationDbAction,
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
        inputData: JobApplication;
      };
    }
  | {
      type: ActionType.READ;
      payload: { inputData: JobApplication[] };
    }
  | {
      type: ActionType.UPDATE;
      payload: {
        id: string;
        inputData: JobApplication;
      };
    }
  | {
      type: ActionType.DELETE;
      payload: { id: string };
    };

const reducer = (state: JobApplicationsData, action: Action) => {
  switch (action.type) {
    case ActionType.CREATE: {
      const newState: JobApplicationsData = {
        ...state,
        applications: [...state.applications, action.payload.inputData],
      };
      return newState;
    }

    case ActionType.READ: {
      const newState: JobApplicationsData = {
        ...state,
        applications: [...action.payload.inputData],
      };
      return newState;
    }

    case ActionType.UPDATE: {
      const newApplications: JobApplication[] = state.applications.reduce(
        (applications, application) => {
          if (application.application_id === action.payload.id)
            applications.push(action.payload.inputData);
          else applications.push(application);
          return applications;
        },
        [],
      );
      const newState: JobApplicationsData = {
        ...state,
        applications: newApplications,
      };
      return newState;
    }

    case ActionType.DELETE: {
      const newApplications: JobApplication[] = state.applications.filter(
        (application) => application.application_id !== action.payload.id,
      );
      const newState: JobApplicationsData = {
        ...state,
        applications: newApplications,
      };
      return newState;
    }

    default: {
      return state;
    }
  }
};

const useJobApplicationActions = (job_id: string = undefined) => {
  const { recruiter } = useAuthDetails();

  const router = useRouter();
  const jobId = job_id ?? (router.query?.id as string);

  const [applicationsData, dispatch] = useReducer(reducer, undefined);
  const initialLoad = recruiter?.id && applicationsData ? true : false;

  const handleJobApplicationCreate = async (
    inputData: Pick<
      JobApplication,
      'first_name' | 'last_name' | 'email' | 'score'
    > &
      InputData,
  ) => {
    if (recruiter) {
      const { data, error } = await createJobApplicationDbAction(
        jobId,
        inputData,
      );
      if (data) {
        const action: Action = {
          type: ActionType.CREATE,
          payload: { inputData: data[0] },
        };
        dispatch(action);
        return true;
      }
      handleJobApplicationError(error);
      return false;
    }
  };

  const handleJobApplicationRead = async () => {
    if (recruiter) {
      const { data, error } = await readJobApplicationDbAction(jobId);
      if (data) {
        const action: Action = {
          type: ActionType.READ,
          payload: { inputData: data },
        };
        dispatch(action);
        return true;
      }
      handleJobApplicationError(error);
      return false;
    }
  };

  const handleJobApplicationUpdate = async (
    applicationId: string,
    inputData: InputData,
  ) => {
    if (recruiter) {
      const { data, error } = await updateJobApplicationDbAction(
        applicationId,
        inputData,
      );
      if (data) {
        const action: Action = {
          type: ActionType.UPDATE,
          payload: {
            id: applicationId,
            inputData: data[0],
          },
        };
        dispatch(action);
        return true;
      }
      handleJobApplicationError(error);
      return false;
    }
  };

  const handleJobApplicationDelete = async (applicationId: string) => {
    if (recruiter) {
      const { data, error } = await deleteJobApplicationDbAction(applicationId);
      if (data) {
        const action: Action = {
          type: ActionType.DELETE,
          payload: { id: applicationId },
        };
        dispatch(action);
        return true;
      }
      handleJobApplicationError(error);
      return false;
    }
  };

  const handleJobApplicationError = (error) => {
    toast.error(`Oops! Something went wrong.\n ${error?.message}`);
  };

  useEffect(() => {
    handleJobApplicationRead();
  }, [recruiter?.id]);

  const value = {
    applicationsData,
    handleJobApplicationCreate,
    handleJobApplicationRead,
    handleJobApplicationUpdate,
    handleJobApplicationDelete,
    handleJobApplicationError,
    initialLoad,
  };

  return value;
};

export default useJobApplicationActions;
