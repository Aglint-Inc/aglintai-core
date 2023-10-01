import { useAuthDetails } from '@context/AuthContext/AuthContext';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useRef, useState } from 'react';

import toast from '@/src/utils/toast';

import {
  InputData,
  JobApplication,
  JobApplicationContext,
  JobApplicationsData,
  JobApplicationSectionData,
  JobApplicationSections,
} from './types';
import {
  bulkCreateJobApplicationDbAction,
  bulkUpdateJobApplicationDbAction,
  createJobApplicationDbAction,
  deleteJobApplicationDbAction,
  getUpdatedJobStatus,
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
  BULK_CREATE,
  // eslint-disable-next-line no-unused-vars
  READ,
  // eslint-disable-next-line no-unused-vars
  UPDATE,
  // eslint-disable-next-line no-unused-vars
  BULK_UPDATE,
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
      type: ActionType.BULK_CREATE;
      payload: {
        applicationData: JobApplication[];
      };
    }
  | {
      type: ActionType.READ;
      payload: {
        applicationData: JobApplication[];
        jobData: Job;
      };
    }
  | {
      type: ActionType.UPDATE;
      payload: {
        applicationData: JobApplication;
      };
    }
  | {
      type: ActionType.DELETE;
      payload: {
        applicationId: string;
        applicationStatus: JobApplicationSections;
      };
    };

const reducer = (state: JobApplicationsData, action: Action) => {
  switch (action.type) {
    case ActionType.CREATE: {
      const newState: JobApplicationsData = {
        ...state,
        applications: {
          ...state.applications,
          [action.payload.applicationData.status as JobApplicationSections]: {
            list: [
              ...state.applications.applied.list,
              action.payload.applicationData,
            ],
            count: state.applications.applied.count + 1,
          },
        },
      };
      return newState;
    }

    case ActionType.BULK_CREATE: {
      const { newApplications, count } = updateApplications(
        state.applications,
        action.payload.applicationData,
      );
      const newState: JobApplicationsData = {
        ...state,
        applications: newApplications,
        count: count,
      };
      return newState;
    }

    case ActionType.READ: {
      const { segregatedApplications, count } = segregateApplications(
        action.payload.applicationData,
      );
      const newState: JobApplicationsData = {
        applications: segregatedApplications,
        count,
        job: action.payload.jobData,
      };
      return newState;
    }

    case ActionType.UPDATE: {
      const newApplications: JobApplicationSectionData = {
        ...state.applications,
        [action.payload.applicationData.status as JobApplicationSections]: {
          ...state.applications[
            action.payload.applicationData.status as JobApplicationSections
          ],
          list: state.applications[
            action.payload.applicationData.status as JobApplicationSections
          ].list.reduce((acc, curr) => {
            if (
              curr.application_id ===
              action.payload.applicationData.application_id
            )
              acc.push(action.payload.applicationData);
            else acc.push(curr);
            return acc;
          }, []),
        },
      };
      const newState: JobApplicationsData = {
        ...state,
        applications: newApplications,
      };
      return newState;
    }

    case ActionType.DELETE: {
      const newApplications: JobApplicationSectionData = {
        ...state.applications,
        [action.payload.applicationStatus]: {
          list: state.applications[
            action.payload.applicationStatus
          ].list.filter(
            (application) =>
              application.application_id !== action.payload.applicationId,
          ),
          count: state.applications[action.payload.applicationStatus].count - 1,
        },
      };
      const newState: JobApplicationsData = {
        ...state,
        applications: newApplications,
        count: state.count - 1,
      };
      return newState;
    }

    default: {
      return state;
    }
  }
};

const segregateApplications = (applicationData: JobApplication[]) => {
  let count = 0;
  const segregatedApplications: JobApplicationSectionData =
    applicationData.reduce(
      (acc, curr) => {
        let objRef = acc[curr.status as JobApplicationSections];
        objRef.list.push(curr);
        objRef.count += 1;
        count += 1;
        return acc;
      },
      Object.assign(
        {},
        ...Object.values(JobApplicationSections).map((val) => {
          return {
            [val]: {
              list: [],
              count: 0,
            },
          };
        }),
      ),
    );
  return { segregatedApplications, count };
};

const updateApplications = (
  stateApplicationData: JobApplicationSectionData,
  newApplicationData: JobApplication[],
) => {
  let count = newApplicationData.length;
  const newApplications = newApplicationData.reduce((acc, curr) => {
    acc[curr.status as JobApplicationSections].list.push(curr);
    acc[curr.status as JobApplicationSections].count += 1;
    return acc;
  }, stateApplicationData);
  return { newApplications, count };
};

const useJobApplicationActions = (
  job_id: string = undefined,
): JobApplicationContext => {
  const { recruiter } = useAuthDetails();

  const router = useRouter();
  const { jobsData, initialLoad: jobLoad } = useJobs();
  const jobId = job_id ?? (router.query?.id as string);

  const [applicationsData, dispatch] = useReducer(reducer, undefined);

  const initialJobLoad = recruiter?.id && jobLoad ? true : false;
  const initialLoad = initialJobLoad && applicationsData ? true : false;

  const [openImportCandidates, setOpenImportCandidates] = useState(false);

  const circularScoreAnimation = useRef(true);

  useEffect(() => {
    if (initialLoad && circularScoreAnimation) {
      const timer = setTimeout(() => {
        circularScoreAnimation.current = false;
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [initialLoad]);

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

  const handleJobApplicationBulkCreate = async (
    inputData: (Pick<
      JobApplication,
      'first_name' | 'last_name' | 'email' | 'score'
    > &
      InputData)[],
  ) => {
    if (recruiter) {
      const { data, error } = await bulkCreateJobApplicationDbAction(
        jobId,
        inputData,
      );
      if (data) {
        const action: Action = {
          type: ActionType.BULK_CREATE,
          payload: { applicationData: data },
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

  const handleJobApplicationBulkUpdate = async (
    updatedApplicationData: JobApplication[],
  ) => {
    const { data: d1, error: e1 } = await bulkUpdateJobApplicationDbAction(
      updatedApplicationData,
    );
    if (d1) {
      const read = await handleJobApplicationRead();
      if (read) return true;
      else {
        handleJobApplicationError(null);
        return false;
      }
    } else {
      handleJobApplicationError(e1);
      return false;
    }
  };

  const handleJobApplicationDelete = async (
    applicationId: string,
    applicationStatus: JobApplicationSections,
  ) => {
    if (recruiter) {
      const { data, error } = await deleteJobApplicationDbAction(applicationId);
      if (data) {
        const action: Action = {
          type: ActionType.DELETE,
          payload: { applicationId, applicationStatus },
        };
        dispatch(action);
        return true;
      }
      handleJobApplicationError(error);
      return false;
    }
  };

  const handleUpdateJobStatus = async (
    applicationIdSet: Set<string>,
    sections: {
      source: JobApplicationSections;
      destination: JobApplicationSections;
    },
  ) => {
    return await handleJobApplicationBulkUpdate(
      getUpdatedJobStatus(
        applicationIdSet,
        applicationsData.applications,
        sections,
      ),
    );
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
    handleJobApplicationBulkCreate,
    handleJobApplicationRead,
    handleJobApplicationUpdate,
    handleJobApplicationBulkUpdate,
    handleJobApplicationDelete,
    handleJobApplicationError,
    handleUpdateJobStatus,
    initialLoad,
    circularScoreAnimation,
    openImportCandidates,
    setOpenImportCandidates,
  };

  return value;
};

export default useJobApplicationActions;
