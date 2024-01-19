/* eslint-disable security/detect-object-injection */
import { useAuthDetails } from '@context/AuthContext/AuthContext';
import { cloneDeep } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useRef, useState } from 'react';

import { usePolling } from '@/src/components/JobApplicationsDashboard/hooks';
import {
  checkSyncCand,
  FilterParameter,
} from '@/src/components/JobApplicationsDashboard/utils';
import { POSTED_BY } from '@/src/components/JobsDashboard/AddJobWithIntegrations/utils';
import { JobApplicationEmails } from '@/src/pages/api/jobApplications/candidateEmail';
import { ReadJobApplicationApi } from '@/src/pages/api/jobApplications/read';
import { handleJobApplicationApi } from '@/src/pages/api/jobApplications/utils';
import { EmailTemplateType } from '@/src/types/data.types';
import toast from '@/src/utils/toast';

import {
  JobApplication,
  JobApplicationsData,
  JobApplicationSections,
  Parameters,
} from './types';
import { getRange } from './utils';
import { useJobs } from '../JobsContext';
import { CountJobs } from '../JobsContext/types';
// eslint-disable-next-line no-unused-vars
enum ActionType {
  // eslint-disable-next-line no-unused-vars
  READ,
  // eslint-disable-next-line no-unused-vars
  SECTION_READ,
  // eslint-disable-next-line no-unused-vars
  UPDATE,
}

type Action =
  | {
      type: ActionType.READ;
      payload: {
        applicationData: JobApplicationsData;
        activeSections: JobApplicationSections[];
      };
    }
  | {
      type: ActionType.SECTION_READ;
      payload: {
        applicationData: JobApplicationsData;
      };
    }
  | {
      type: ActionType.UPDATE;
      payload: Partial<JobApplication>;
    };

const reducer = (state: JobApplicationsData, action: Action) => {
  switch (action.type) {
    case ActionType.READ: {
      const newState: JobApplicationsData = action.payload.applicationData
        ? Object.entries(action.payload.applicationData).reduce(
            (acc, [key, value]) => {
              return { ...acc, [key]: value };
            },
            Object.assign(
              {},
              ...action.payload.activeSections.map((s) => ({ [s]: [] })),
            ) as unknown as JobApplicationsData,
          )
        : null;
      return newState;
    }
    case ActionType.SECTION_READ: {
      const newState: JobApplicationsData = Object.entries(
        action.payload.applicationData,
      ).reduce(
        (acc, [key, value]) => {
          return { ...acc, [key]: value };
        },
        { ...state },
      );
      return newState;
    }
    case ActionType.UPDATE: {
      const applicationState = Object.assign(
        {},
        ...Object.entries(state).map(([key, value]) => {
          return {
            [key]: value.map((v) => {
              if (v.id === action.payload.id) {
                return Object.entries(action.payload).reduce(
                  (acc, [key, value]) => {
                    if (typeof value === 'object')
                      return { ...acc, [key]: { ...v[key], ...value } };
                    else return { ...acc, [key]: value };
                  },
                  { ...v },
                );
              }
              return v;
            }),
          };
        }),
      );
      return applicationState as JobApplicationsData;
    }

    default: {
      return state;
    }
  }
};

const useProviderJobApplicationActions = (job_id: string = undefined) => {
  const { recruiter } = useAuthDetails();

  const router = useRouter();
  const { jobsData, initialLoad: jobLoad, handleUIJobUpdate } = useJobs();
  const jobId = job_id ?? (router.query?.id as string);

  const [applications, dispatch] = useReducer(reducer, undefined);
  const [section, setSection] = useState<JobApplicationSections>(
    JobApplicationSections.NEW,
  );

  const paginationLimit = 100;
  const longPolling = 600000;

  const initialJobLoad = recruiter?.id && jobLoad ? true : false;
  const job = initialJobLoad
    ? jobsData.jobs.find((job) => job.id === jobId)
    : undefined;

  const initialLoad =
    initialJobLoad && applications !== undefined ? true : false;

  const initialJobApplicationPageNumbers = Object.values(
    JobApplicationSections,
  ).reduce((acc, curr) => {
    return { ...acc, [curr]: 1 };
    // eslint-disable-next-line no-unused-vars
  }, {}) as { [key in JobApplicationSections]: number };
  const [pageNumber, setPageNumber] = useState(
    initialJobApplicationPageNumbers,
  );
  const ranges = Object.values(JobApplicationSections)
    .filter(
      (section) =>
        section !== JobApplicationSections.ASSESSMENT ||
        (initialJobLoad && job?.assessment),
    )
    .reduce((acc, curr) => {
      return {
        ...acc,
        [curr]: getRange(pageNumber[curr], paginationLimit),
      };
    }, {}) as ReadJobApplicationApi['request']['ranges'];

  const [atsSync, setAtsSync] = useState(false);

  const defaultFilters: FilterParameter = {
    interview_score: {
      max: 100,
      min: 0,
      active: false,
    },
    overall_score: {
      max: 100,
      min: 0,
      active: false,
    },
    location: {
      name: null,
      value: 10,
      active: false,
    },
  };

  const initialParameters: Parameters = {
    sort: { parameter: 'overall_score', ascending: false },
    filter: { ...defaultFilters },
    search: null,
  };
  const [searchParameters, setSearchParameters] = useState({
    ...initialParameters,
  });

  const showInterview =
    section !== JobApplicationSections.NEW &&
    section !== JobApplicationSections.SCREENING &&
    initialJobLoad &&
    job?.assessment;

  const activeSections = Object.values(JobApplicationSections).reduce(
    (acc, curr) => {
      if (
        curr === JobApplicationSections.ASSESSMENT &&
        !(initialJobLoad && job?.assessment)
      )
        return acc;
      acc.push(curr);
      return acc;
    },
    [] as JobApplicationSections[],
  );

  const [allApplicationsDisabled, setAllApplicationsDisabled] = useState(false);
  const [cardStateManager, setCardStateManager] = useState(
    Object.assign(
      {},
      ...activeSections.map((a) => ({
        [a]: {
          checkList: {
            list: new Set<string>(),
            disabled: false,
          },
          disabledList: new Set<string>(),
        },
      })),
    ) as {
      // eslint-disable-next-line no-unused-vars
      [key in JobApplicationSections]?: {
        checkList: {
          list: Set<string>;
          disabled: boolean;
        };
        disabledList: Set<string>;
      };
    },
  );
  const cardStates = cardStateManager[section];
  const setCardStates = (
    // eslint-disable-next-line no-unused-vars
    callBack: (prev: typeof cardStates) => typeof cardStates,
  ) => {
    const newValue = callBack(cardStates);
    setCardStateManager((prev) => {
      return {
        ...prev,
        [section]: cloneDeep(newValue),
      };
    });
  };

  //PRIMARY
  const handleJobApplicationRead = async (
    request: Omit<ReadJobApplicationApi['request'], 'sections'>,
    signal?: AbortSignal,
  ) => {
    if (recruiter) {
      const { data, error, filteredCount, unFilteredCount } =
        await handleJobApplicationApi(
          'read',
          { ...request, sections: activeSections },
          signal,
        );
      if (data) {
        const action: Action = {
          type: ActionType.READ,
          payload: { applicationData: data, activeSections },
        };
        if (job.posted_by == POSTED_BY.ASHBY) {
          const is_sync = await checkSyncCand(job);
          setAtsSync(is_sync);
        }
        handleUIJobUpdate({ ...job, count: unFilteredCount });
        dispatch(action);
        return { confirmation: true, filteredCount, unFilteredCount };
      }
      if (initialLoad) handleJobApplicationError(error);
      return {
        confirmation: false,
        filteredCount: null as CountJobs,
        unFilteredCount: null as CountJobs,
      };
    }
  };

  //PRIMARY
  const handleJobApplicationSectionRead = async (
    request: ReadJobApplicationApi['request'],
    signal?: AbortSignal,
  ) => {
    if (recruiter) {
      const { data, error, filteredCount, unFilteredCount } =
        await handleJobApplicationApi('read', request, signal);
      if (data) {
        const action: Action = {
          type: ActionType.SECTION_READ,
          payload: { applicationData: data },
        };
        if (job.posted_by == POSTED_BY.ASHBY) {
          const is_sync = await checkSyncCand(job);
          setAtsSync(is_sync);
        }
        dispatch(action);
        return { confirmation: true, filteredCount, unFilteredCount };
      }
      handleJobApplicationError(error);
      return {
        confirmation: false,
        filteredCount: null as CountJobs,
        unFilteredCount: null as CountJobs,
      };
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
      setAllApplicationsDisabled(true);
      const newRanges = {
        ...ranges,
        [section]: getRange(pageNumber, paginationLimit),
      } as ReadJobApplicationApi['request']['ranges'];
      const { confirmation } = await handleJobApplicationSectionRead({
        job_id: jobId,
        ranges: newRanges,
        sections: [section],
        ...searchParameters,
      });
      if (confirmation) {
        setPageNumber((prev) => {
          return { ...prev, [section]: pageNumber };
        });
        setAllApplicationsDisabled(false);
        return true;
      }
    }
    setAllApplicationsDisabled(false);
    return false;
  };

  //SECONDARY
  const handleJobApplicationSectionUpdate = async (
    sections: {
      source: JobApplicationSections;
      destination: JobApplicationSections;
    },
    purpose?: JobApplicationEmails['request']['purpose'],
    applicationIdSet?: Set<string>,
    updateAll: boolean = false,
  ) => {
    if (recruiter) {
      const candidates = !updateAll
        ? applications[section].reduce(
            (acc, curr) => {
              if (applicationIdSet.has(curr.id))
                acc.push({
                  application_id: curr.id,
                  email: curr.candidates.email,
                  first_name: curr.candidates.first_name,
                  last_name: curr.candidates.last_name,
                  status_emails_sent: curr.status_emails_sent,
                });
              return acc;
            },
            [] as JobApplicationEmails['request']['candidates'],
          )
        : null;
      const { data, error, filteredCount, unFilteredCount } =
        await handleJobApplicationApi('candidateEmail', {
          job: {
            id: job.id,
            company: job.company,
            email_template: job.email_template as EmailTemplateType,
          },
          parameter: {
            ranges,
            ...searchParameters,
          },
          sections,
          candidates,
          purpose,
        });
      if (data) {
        const action: Action = {
          type: ActionType.SECTION_READ,
          payload: { applicationData: data },
        };
        if (job.posted_by == POSTED_BY.ASHBY) {
          const is_sync = await checkSyncCand(job);
          setAtsSync(is_sync);
        }
        handleUIJobUpdate({
          ...job,
          count: { ...job.count, ...unFilteredCount },
        });
        dispatch(action);
        return { confirmation: true, filteredCount, unFilteredCount };
      }
      handleJobApplicationError(error);
      return {
        confirmation: false,
        filteredCount: null as CountJobs,
        unFilteredCount: null as CountJobs,
      };
    }
  };

  //TERTIARY
  const handleJobApplicationError = (error) => {
    if (typeof error === 'string') {
      toast.error(`Oops! Something went wrong.\n (${error})`);
    } else if (typeof error === 'object') {
      if (error.message)
        toast.error(`Oops! Something went wrong.\n (${error.message})`);
      else if (Array.isArray(error))
        error.map((e) =>
          e.message
            ? toast.error(`Oops! Something went wrong.\n (${e.message})`)
            : toast.error(
                `Oops! Something went wrong.\n (${JSON.stringify(e)})`,
              ),
        );
      else
        toast.error(`Oops! Something went wrong.\n ${JSON.stringify(error)}`);
    }
  };

  //SECONDARY
  const handleJobApplicationFilter = async (
    parameters: Parameters,
    signal?: AbortSignal,
  ) => {
    setSearchParameters({ ...parameters });
    setAllApplicationsDisabled(true);
    const { confirmation, filteredCount } = await handleJobApplicationRead(
      {
        job_id: jobId,
        ranges: ranges,
        ...parameters,
      },
      signal,
    );
    setAllApplicationsDisabled(false);
    if (confirmation) {
      return { confirmation: true, filteredCount };
    }
    setSearchParameters({ ...cloneDeep(searchParameters) });
    return {
      confirmation: false,
      // eslint-disable-next-line no-unused-vars
      filteredCount: null as CountJobs,
    };
  };

  //SECONDARY
  const handleJobApplicationInit = async () => {
    const confirmation = await handleJobApplicationRefresh();
    if (!confirmation) {
      const action: Action = {
        type: ActionType.READ,
        payload: {
          activeSections,
          applicationData: Object.assign(
            {},
            ...Object.values(JobApplicationSections).map((section) => ({
              [section]: [],
            })),
          ) as {
            // eslint-disable-next-line no-unused-vars
            [key in JobApplicationSections]: JobApplication[];
          },
        },
      };
      dispatch(action);
      return false;
    }
    return true;
  };

  const refreshRef = useRef(true);

  const handleAutoRefresh = async () => {
    setAllApplicationsDisabled(true);
    await handleJobApplicationRefresh();
    setAllApplicationsDisabled(false);
  };

  const handleManualRefresh = async () => {
    refreshRef.current = !refreshRef.current;
    await handleAutoRefresh();
  };

  usePolling(async () => await handleAutoRefresh(), longPolling, [
    ...Object.values(pageNumber),
    section,
    refreshRef.current,
    searchParameters.search,
    searchParameters.sort.ascending,
    searchParameters.sort.parameter,
  ]);

  useEffect(() => {
    if (initialJobLoad) {
      handleJobApplicationInit();
    }
  }, [initialJobLoad]);

  const value = {
    applications,
    setCardStates,
    cardStates,
    allApplicationsDisabled,
    setAllApplicationsDisabled,
    paginationLimit,
    job,
    atsSync,
    pageNumber,
    section,
    setSection,
    handleJobApplicationPaginate,
    handleJobApplicationRefresh,
    handleJobApplicationSectionUpdate,
    handleJobApplicationFilter,
    handleManualRefresh,
    defaultFilters,
    searchParameters,
    initialLoad,
    showInterview,
  };

  return value;
};

export default useProviderJobApplicationActions;
