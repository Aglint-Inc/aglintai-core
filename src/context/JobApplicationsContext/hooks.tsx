/* eslint-disable security/detect-object-injection */
import { useAuthDetails } from '@context/AuthContext/AuthContext';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useRef, useState } from 'react';

import { checkSyncCand } from '@/src/components/JobApplicationsDashboard/utils';
import { POSTED_BY } from '@/src/components/JobsDashboard/AddJobWithIntegrations/utils';
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
  updateAllJobStatusDbAction,
  updateJobApplicationDbAction,
} from './utils';
import { useJobs } from '../JobsContext';
import { CountJobs } from '../JobsContext/types';
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
      const newState: JobApplicationsData = action.payload.applicationData
        ? {
            ...action.payload.applicationData,
          }
        : null;
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
  const [section, setSection] = useState<JobApplicationSections>(
    JobApplicationSections.NEW,
  );

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

  const initialLoad =
    initialJobLoad && applications !== undefined ? true : false;
  const [atsSync, setAtsSync] = useState(false);
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

  //SECONDARY
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

  //SECONDARY
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

  //PRIMARY
  const handleJobApplicationRead = async (
    request: ReadJobApplicationApi['request'],
  ) => {
    if (recruiter) {
      const { data: axiosData } = await axios({
        method: 'post',
        url: '/api/JobApplicationsApi/read',
        data: request,
      });
      const { data, error, count }: ReadJobApplicationApi['response'] =
        axiosData;
      if (data) {
        const action: Action = {
          type: ActionType.READ,
          payload: { applicationData: data },
        };
        if (job.posted_by == POSTED_BY.ASHBY) {
          const is_sync = await checkSyncCand(job);
          setAtsSync(is_sync);
        }
        await handleUpdateJobCount([job.id]);
        dispatch(action);
        updateTick.current = !updateTick.current;
        return { confirmation: true, count: count };
      }
      if (initialLoad) handleJobApplicationError(error);
      return { confirmation: false, count: null as CountJobs };
    }
  };

  //SECONDARY
  const handleJobApplicationRefresh = async () => {
    if (recruiter) {
      const request = {
        job_id: jobId,
        ranges: ranges,
        ...searchParameters,
      };
      const { confirmation } = await handleJobApplicationRead(request);
      if (confirmation) return true;
    }
    return false;
  };

  //SECONDARY
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
      const { confirmation } = await handleJobApplicationRead({
        job_id: jobId,
        ranges: newRanges,
        ...searchParameters,
      });
      if (confirmation) {
        setPageNumber((prev) => {
          return { ...prev, [section]: pageNumber };
        });
        setApplicationDisable(false);
        return true;
      }
    }
    setApplicationDisable(false);
    return false;
  };

  //PRIMARY
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
        await handleUpdateJobCount([job.id]);
        dispatch(action);
        updateTick.current = !updateTick.current;
        return true;
      }
      handleJobApplicationError(error);
      return false;
    }
  };

  //SECONDARY
  const handleJobApplicationBulkUpdate = async (
    updatedApplicationData: NewJobApplications[],
  ) => {
    const { data: d1, error: e1 } = await bulkUpdateJobApplicationDbAction(
      updatedApplicationData,
    );
    if (d1) {
      const { confirmation } = await handleJobApplicationRead({
        job_id: jobId,
        ranges: ranges,
        ...searchParameters,
      });
      if (confirmation) {
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

  //PRIMARY
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
        await handleUpdateJobCount([job.id]);
        dispatch(action);
        updateTick.current = !updateTick.current;
        return true;
      }
      handleJobApplicationError(error);
      return false;
    }
  };

  //SECONDARY
  const handleUpdateJobStatus = async (
    sections: {
      source: JobApplicationSections;
      destination: JobApplicationSections;
    },
    applicationIdSet?: Set<string>,
    updateAll: boolean = false,
  ) => {
    if (updateAll) {
      const { data, error } = await updateAllJobStatusDbAction(
        job.id,
        sections,
        searchParameters.search,
        searchParameters.filter,
      );
      if (data) {
        await handleJobApplicationRefresh();
        return true;
      } else {
        handleJobApplicationError(error);
        return false;
      }
    } else {
      return await handleJobApplicationBulkUpdate(
        getUpdatedJobStatus(applicationIdSet, applications, sections),
      );
    }
  };

  //TERTIARY
  const handleJobApplicationError = (error) => {
    toast.error(`Oops! Something went wrong.\n (${error?.message})`);
  };

  //SECONDARY
  const handleJobApplicationFilter = async (parameters: Parameters) => {
    setApplicationDisable(true);
    const { confirmation, count } = await handleJobApplicationRead({
      job_id: jobId,
      ranges: ranges,
      ...parameters,
    });
    setApplicationDisable(false);
    if (confirmation) {
      setSearchParameters({ ...parameters });
      return { confirmation: true, count: count };
    }
    return {
      confirmation: false,
      // eslint-disable-next-line no-unused-vars
      count: null as CountJobs,
    };
  };

  const handleJobApplicationInit = async () => {
    const confirmation = await handleJobApplicationRefresh();
    if (!confirmation) {
      const action: Action = {
        type: ActionType.READ,
        payload: { applicationData: null },
      };
      dispatch(action);
      return false;
    }
    return true;
  };
  useEffect(() => {
    if (initialJobLoad) {
      handleJobApplicationInit();
    }
  }, [initialJobLoad]);

  const value = {
    applications,
    applicationDisable,
    setApplicationDisable,
    paginationLimit,
    job,
    atsSync,
    updateTick: updateTick.current,
    pageNumber,
    handleJobApplicationCreate,
    handleJobApplicationBulkCreate,
    handleJobApplicationRead,
    handleJobApplicationPaginate,
    handleJobApplicationUpdate,
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
    section,
    setSection,
  };

  return value;
};

export default useProviderJobApplicationActions;
