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
  getUpdatedJobStatus,
  // readJobApplicationDbAction,
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
  const { jobsData, initialLoad: jobLoad } = useJobs();
  const jobId = job_id ?? (router.query?.id as string);

  const paginationLimit = 10;

  const initialJobApplicationDepth = Object.values(
    JobApplicationSections,
  ).reduce((acc, curr) => {
    return { ...acc, [curr]: paginationLimit };
    // eslint-disable-next-line no-unused-vars
  }, {}) as { [key in JobApplicationSections]: number };

  const [applications, dispatch] = useReducer(reducer, undefined);
  const [applicationDepth, setApplicationDepth] = useState(
    initialJobApplicationDepth,
  );
  const initialRanges = Object.values(JobApplicationSections).reduce(
    (acc, curr) => {
      return { ...acc, [curr]: { start: 0, end: applicationDepth[curr] - 1 } };
    },
    {},
  ) as ReadJobApplicationApi['request']['ranges'];
  const initialJobLoad = recruiter?.id && jobLoad ? true : false;
  const job = initialJobLoad && jobsData.jobs.find((job) => job.id === jobId);
  const initialLoad = initialJobLoad && applications ? true : false;

  const [openImportCandidates, setOpenImportCandidates] = useState(false);
  const [openManualImportCandidates, setOpenManualImportCandidates] =
    useState(false);

  const initialParameters: Parameters = {
    sort: { parameter: 'first_name', ascending: true },
    filter: [], //[{ parameter: 'resume_score', condition: 'gte', count: 0 }],
    search: null,
  };
  const [searchParameters, setSearchParameters] = useState({
    ...initialParameters,
  });

  const [applicationDisable, setApplicationDisable] = useState(false);

  const circularScoreAnimation = useRef(true);
  const updateTick = useRef(false);

  useEffect(() => {
    if (initialLoad && circularScoreAnimation) {
      const timer = setTimeout(() => {
        circularScoreAnimation.current = false;
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [initialLoad]);

  const handleJobApplicationCreate = async (inputData: JobApplication) => {
    if (recruiter) {
      const { data, error } = await createJobApplicationDbAction(
        jobId,
        inputData,
      );
      if (data) {
        await handleJobApplicationPaginatedPolling([
          JobApplicationSections.NEW,
        ]);
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
        await handleJobApplicationPaginatedPolling([
          JobApplicationSections.NEW,
        ]);
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

  const handleJobApplicationPaginatedRead = async (
    sections: JobApplicationSections[],
  ) => {
    if (recruiter) {
      const ranges = sections.reduce((acc, curr) => {
        return {
          ...acc,
          [curr]: {
            start: applicationDepth[curr],
            end: applicationDepth[curr] + paginationLimit - 1,
          },
        };
      }, {});
      const { data: axiosData } = await axios({
        method: 'post',
        url: '/api/JobApplicationsApi/read',
        data: {
          job_id: jobId,
          ranges: ranges,
          ...searchParameters,
        },
      });
      const { data, error }: ReadJobApplicationApi['response'] = axiosData;
      if (data) {
        const action: Action = {
          type: ActionType.PAGINATED_READ,
          payload: { applicationData: data },
        };
        dispatch(action);
        setApplicationDepth(
          sections.reduce(
            (acc, curr) => {
              return { ...acc, [curr]: ranges[curr]['end'] + 1 };
            },
            { ...applicationDepth },
          ),
        );
        updateTick.current = !updateTick.current;
        return true;
      }
      handleJobApplicationError(error);
      return false;
    }
  };

  const handleJobApplicationPaginatedPolling = async (
    sections: JobApplicationSections[],
  ) => {
    if (recruiter) {
      const ranges = sections.reduce((acc, curr) => {
        return {
          ...acc,
          [curr]: { start: 0, end: applicationDepth[curr] - 1 },
        };
      }, {});
      const { data: axiosData } = await axios({
        method: 'post',
        url: '/api/JobApplicationsApi/read',
        data: {
          job_id: jobId,
          ranges: ranges,
          ...searchParameters,
        },
      });
      const { data, error }: ReadJobApplicationApi['response'] = axiosData;
      if (data) {
        const action: Action = {
          type: ActionType.PAGINATED_UPDATE,
          payload: { applicationData: data },
        };
        dispatch(action);
        updateTick.current = !updateTick.current;
        return true;
      }
      handleJobApplicationError(error);
      return false;
    }
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
        ranges: initialRanges,
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
    const ranges = Object.values(JobApplicationSections).reduce((acc, curr) => {
      return { ...acc, [curr]: { start: 0, end: applicationDepth[curr] } };
    }, {}) as ReadJobApplicationApi['request']['ranges'];
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
      setSearchParameters(() => {
        handleJobApplicationRead({
          job_id: jobId,
          ranges: initialRanges,
          ...initialParameters,
        });
        return { ...initialParameters };
      });
    }
  }, [initialJobLoad]);

  const value = {
    applications,
    applicationDepth,
    applicationDisable,
    job,
    updateTick: updateTick.current,
    handleJobApplicationCreate,
    handleJobApplicationBulkCreate,
    handleJobApplicationRead,
    handleJobApplicationPaginatedRead,
    handleJobApplicationPaginatedPolling,
    handleJobApplicationUpdate,
    handleJobApplicationUIUpdate,
    handleJobApplicationBulkUpdate,
    handleJobApplicationDelete,
    handleJobApplicationError,
    handleUpdateJobStatus,
    handleJobApplicationFilter,
    searchParameters,
    initialLoad,
    circularScoreAnimation,
    openImportCandidates,
    setOpenImportCandidates,
    openManualImportCandidates,
    setOpenManualImportCandidates,
  };

  return value;
};

export default useProviderJobApplicationActions;
