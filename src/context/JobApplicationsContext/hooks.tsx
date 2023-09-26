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
import { useJobs } from '../JobsContext';
import { Job } from '../JobsContext/types';

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
        applicationData: JobApplication;
      };
    }
  | {
      type: ActionType.READ;
      payload: { applicationData: JobApplication[]; jobData: Job };
    }
  | {
      type: ActionType.UPDATE;
      payload: {
        applicationId: string;
        applicationData: JobApplication;
      };
    }
  | {
      type: ActionType.DELETE;
      payload: { applicationId: string };
    };

const reducer = (state: JobApplicationsData, action: Action) => {
  switch (action.type) {
    case ActionType.CREATE: {
      const newState: JobApplicationsData = {
        ...state,
        applications: [...state.applications, action.payload.applicationData],
      };
      return newState;
    }

    case ActionType.READ: {
      const newState: JobApplicationsData = {
        ...state,
        applications: [...action.payload.applicationData],
        job: action.payload.jobData,
      };
      return newState;
    }

    case ActionType.UPDATE: {
      const newApplications: JobApplication[] = state.applications.reduce(
        (applications, application) => {
          if (application.application_id === action.payload.applicationId)
            applications.push(action.payload.applicationData);
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
        (application) =>
          application.application_id !== action.payload.applicationId,
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
  const { jobsData, initialLoad: jobLoad } = useJobs();
  const jobId = job_id ?? (router.query?.id as string);

  const [applicationsData, dispatch] = useReducer(reducer, undefined);

  const initialJobLoad = recruiter?.id && jobLoad ? true : false;
  const initialLoad = initialJobLoad && applicationsData ? true : false;

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
          payload: { applicationData: data[0] },
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
        const selectedJob = jobsData.jobs.find((job) => job.id === jobId);
        const action: Action = {
          type: ActionType.READ,
          payload: { applicationData: data, jobData: selectedJob ?? null },
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
            applicationId,
            applicationData: data[0],
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
          payload: { applicationId },
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
    if (initialJobLoad) handleJobApplicationRead();
  }, [initialJobLoad]);

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
