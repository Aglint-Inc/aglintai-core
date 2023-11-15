/* eslint-disable security/detect-object-injection */
import { useAuthDetails } from '@context/AuthContext/AuthContext';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useRef, useState } from 'react';

import { ReadJobApplicationApi } from '@/src/pages/api/JobApplicationsApi/read';
import toast from '@/src/utils/toast';

import {
  JobApplication,
  JobApplicationContext,
  JobApplicationsData,
  JobApplicationSections,
  NewJobApplications,
  Parameters,
} from './types';
import {
  bulkCreateJobApplicationDbAction,
  bulkUpdateJobApplicationDbAction,
  createJobApplicationDbAction,
  deleteJobApplicationDbAction,
  getRange,
  getUpdatedJobStatus,
  updateJobApplicationDbAction,
} from './utils';
import { useJobs } from '../JobsContext';
// eslint-disable-next-line no-unused-vars
enum ActionType {
  // eslint-disable-next-line no-unused-vars
  READ,
  // eslint-disable-next-line no-unused-vars
  PAGINATED_READ,
  // eslint-disable-next-line no-unused-vars
  PAGINATED_UPDATE,
  // eslint-disable-next-line no-unused-vars
  UPDATE,
  // eslint-disable-next-line no-unused-vars
  BULK_UPDATE,
  // eslint-disable-next-line no-unused-vars
  DELETE,
}

type Action =
  | {
      type: ActionType.READ;
      payload: {
        applicationData: JobApplicationsData;
      };
    }
  | {
      type: ActionType.PAGINATED_READ;
      payload: {
        applicationData: JobApplicationsData;
      };
    }
  | {
      type: ActionType.PAGINATED_UPDATE;
      payload: {
        applicationData: JobApplicationsData;
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
    case ActionType.READ: {
      const newState: JobApplicationsData = {
        ...action.payload.applicationData,
      };
      return newState;
    }
    case ActionType.PAGINATED_READ: {
      const newState: JobApplicationsData = Object.entries(
        action.payload.applicationData,
      ).reduce(
        (acc, [key, value]) => {
          return { ...acc, [key]: [...state[key], ...value] };
        },
        { ...state },
      );
      return newState;
    }
    case ActionType.PAGINATED_UPDATE: {
      const newState: JobApplicationsData = Object.entries(
        action.payload.applicationData,
      ).reduce(
        (acc, [key, value]) => {
          return { ...acc, [key]: [...value] };
        },
        { ...state },
      );
      return newState;
    }
    case ActionType.UPDATE: {
      const newState: JobApplicationsData = {
        ...state,
        [action.payload.applicationData.status]: state[
          action.payload.applicationData.status
        ].reduce((acc: JobApplication[], curr: JobApplication) => {
          if (
            curr.application_id ===
            action.payload.applicationData.application_id
          )
            acc.push(action.payload.applicationData);
          else acc.push(curr);
          return acc;
        }, []),
      };
      return newState;
    }

    case ActionType.DELETE: {
      const newState: JobApplicationsData = {
        ...state,
        [action.payload.applicationStatus]: state[
          action.payload.applicationStatus
        ].filter(
          (a: JobApplication) =>
            a.application_id !== action.payload.applicationId,
        ),
      };
      return newState;
    }

    default: {
      return state;
    }
  }
};

const useProviderJobApplicationActions = (
  job_id: string = undefined,
): JobApplicationContext => {
  const { recruiter } = useAuthDetails();

  const router = useRouter();
  const { jobsData, initialLoad: jobLoad, handleUpdateJobCount } = useJobs();
  const jobId = job_id ?? (router.query?.id as string);

  const [applications, dispatch] = useReducer(reducer, undefined);

  const paginationLimit = 100;
  const initialJobApplicationPageNumbers = Object.values(
    JobApplicationSections,
  ).reduce((acc, curr) => {
    return { ...acc, [curr]: 1 };
    // eslint-disable-next-line no-unused-vars
  }, {}) as { [key in JobApplicationSections]: number };
  const [pageNumber, setPageNumber] = useState(
    initialJobApplicationPageNumbers,
  );
  const ranges = Object.values(JobApplicationSections).reduce((acc, curr) => {
    return {
      ...acc,
      [curr]: getRange(pageNumber[curr], paginationLimit),
    };
  }, {}) as ReadJobApplicationApi['request']['ranges'];
  const initialJobLoad = recruiter?.id && jobLoad ? true : false;
  const job = initialJobLoad
    ? jobsData.jobs.find((job) => job.id === jobId)
    : undefined;
  const initialLoad = initialJobLoad && applications ? true : false;

  const [openImportCandidates, setOpenImportCandidates] = useState(false);
  const [openManualImportCandidates, setOpenManualImportCandidates] =
    useState(false);

  const initialParameters: Parameters = {
    sort: { parameter: 'resume_score', ascending: false },
    filter: [],
    search: null,
  };
  const [searchParameters, setSearchParameters] = useState({
    ...initialParameters,
  });

  const [applicationDisable, setApplicationDisable] = useState(false);

  const updateTick = useRef(false);

  const handleJobApplicationCreate = async (inputData: JobApplication) => {
    if (recruiter) {
      const { data, error } = await createJobApplicationDbAction(
        jobId,
        inputData,
      );
      if (data) {
        await handleJobApplicationRefresh();
        return true;
      }
      handleJobApplicationError(error);
      return false;
    }
  };

  const handleJobApplicationBulkCreate = async (
    inputData: JobApplication[],
  ) => {
    if (recruiter) {
      const { data, error } = await bulkCreateJobApplicationDbAction(
        jobId,
        inputData,
      );
      if (data) {
        await handleJobApplicationRefresh();
        return true;
      }
      handleJobApplicationError(error);
      return false;
    }
  };

  const handleJobApplicationRead = async (
    request: ReadJobApplicationApi['request'],
  ) => {
    if (recruiter) {
      const { data: axiosData } = await axios({
        method: 'post',
        url: '/api/JobApplicationsApi/read',
        data: request,
      });
      const { data, error }: ReadJobApplicationApi['response'] = axiosData;
      if (data) {
        const action: Action = {
          type: ActionType.READ,
          payload: { applicationData: data },
        };
        dispatch(action);
        return true;
      }
      handleJobApplicationError(error);
      return false;
    }
  };

  const handleJobApplicationRefresh = async () => {
    if (recruiter) {
      const request = {
        job_id: jobId,
        ranges: ranges,
        ...searchParameters,
      };
      const confirmation = await handleJobApplicationRead(request);
      if (confirmation) return true;
    }
    return false;
  };

  const handleJobApplicationPaginate = async (
    pageNumber: number,
    section: JobApplicationSections,
  ) => {
    if (recruiter) {
      setApplicationDisable(true);
      const newRanges = {
        ...ranges,
        [section]: getRange(pageNumber, paginationLimit),
      } as ReadJobApplicationApi['request']['ranges'];
      const confirmation = await handleJobApplicationRead({
        job_id: jobId,
        ranges: newRanges,
        ...searchParameters,
      });
      setApplicationDisable(false);
      if (confirmation) {
        setPageNumber((prev) => {
          return { ...prev, [section]: pageNumber };
        });
        return true;
      }
    }
    return false;
  };

  const handleJobApplicationUpdate = async (
    applicationId: string,
    inputData: NewJobApplications,
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
        updateTick.current = !updateTick.current;
        return true;
      }
      handleJobApplicationError(error);
      return false;
    }
  };

  const handleJobApplicationUIUpdate = (jobApplication: JobApplication) => {
    if (recruiter) {
      const action: Action = {
        type: ActionType.UPDATE,
        payload: {
          applicationData: jobApplication,
        },
      };
      dispatch(action);
      updateTick.current = !updateTick.current;
      return true;
    }
  };

  const handleJobApplicationBulkUpdate = async (
    updatedApplicationData: NewJobApplications[],
  ) => {
    const { data: d1, error: e1 } = await bulkUpdateJobApplicationDbAction(
      updatedApplicationData,
    );
    if (d1) {
      const read = await handleJobApplicationRead({
        job_id: jobId,
        ranges: ranges,
        ...searchParameters,
      });
      if (read) {
        updateTick.current = !updateTick.current;
        return true;
      } else {
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
        updateTick.current = !updateTick.current;
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
      getUpdatedJobStatus(applicationIdSet, applications, sections),
    );
  };

  const handleJobApplicationError = (error) => {
    toast.error(`Oops! Something went wrong.\n (${error?.message})`);
  };

  const handleJobApplicationFilter = async (parameters: Parameters) => {
    setApplicationDisable(true);
    const confirmation = await handleJobApplicationRead({
      job_id: jobId,
      ranges: ranges,
      ...parameters,
    });
    if (confirmation) setSearchParameters({ ...parameters });
    setApplicationDisable(false);
  };

  useEffect(() => {
    if (initialJobLoad) {
      handleJobApplicationRefresh();
    }
  }, [initialJobLoad]);

  useEffect(() => {
    if (initialLoad && job) {
      const timer = setTimeout(async () => {
        await handleUpdateJobCount([job.id]);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [initialLoad, updateTick.current]);

  const value = {
    applications,
    applicationDisable,
    paginationLimit,
    job,
    updateTick: updateTick.current,
    pageNumber,
    handleJobApplicationCreate,
    handleJobApplicationBulkCreate,
    handleJobApplicationRead,
    handleJobApplicationPaginate,
    handleJobApplicationUpdate,
    handleJobApplicationUIUpdate,
    handleJobApplicationRefresh,
    handleJobApplicationBulkUpdate,
    handleJobApplicationDelete,
    handleJobApplicationError,
    handleUpdateJobStatus,
    handleJobApplicationFilter,
    searchParameters,
    initialLoad,
    openImportCandidates,
    setOpenImportCandidates,
    openManualImportCandidates,
    setOpenManualImportCandidates,
  };

  return value;
};

export default useProviderJobApplicationActions;
