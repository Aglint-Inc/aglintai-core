/* eslint-disable security/detect-object-injection */
import { useAuthDetails } from '@context/AuthContext/AuthContext';
import { cloneDeep } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useRef, useState } from 'react';

import { usePolling } from '@/src/components/JobApplicationsDashboard/hooks';
import {
  checkSyncCand,
  FilterParameter,
  getAssessmentStatus,
  getDisqualificationStatus,
  getScreeningStatus,
  // getAssessmentStatus,
  // getDisqualificationStatus,
  // getScreeningStatus,
} from '@/src/components/JobApplicationsDashboard/utils';
import { POSTED_BY } from '@/src/components/JobsDashboard/AddJobWithIntegrations/utils';
import { JobApplicationEmails } from '@/src/pages/api/jobApplications/candidateEmail';
import { ReadJobApplicationApi } from '@/src/pages/api/jobApplications/read';
import { handleJobApplicationApi } from '@/src/pages/api/jobApplications/utils';
import { EmailTemplateType } from '@/src/types/data.types';
import toast from '@/src/utils/toast';

import {
  CardStateManager,
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
  NOT_FOUND,
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
      type: ActionType.NOT_FOUND;
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
    case ActionType.NOT_FOUND:
      return null;
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

  const paginationLimit = 50;
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
    },
    overall_score: {
      max: 100,
      min: 0,
    },
    location: {
      name: null,
      value: 10,
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

  const [allApplicationsDisabled, setAllApplicationsDisabled] = useState(false);
  const [cardStateManager, setCardStateManager] =
    useState<CardStateManager>(undefined);
  const activeSections = cardStateManager
    ? (Object.keys(cardStateManager) as JobApplicationSections[])
    : undefined;
  const cardStates = cardStateManager ? cardStateManager[section] : undefined;
  const setCardStates = cardStates
    ? (
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
      }
    : undefined;

  //PRIMARY
  const handleJobApplicationRead = async (
    request: ReadJobApplicationApi['request'],
    signal?: AbortSignal,
  ) => {
    if (recruiter) {
      const { data, error, filteredCount, unFilteredCount } =
        await handleJobApplicationApi('read', { ...request }, signal);
      if (data) {
        const action: Action = {
          type: ActionType.READ,
          payload: { applicationData: data, activeSections: request.sections },
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

  const showDisqualificationEmailComponent = applications
    ? applications[JobApplicationSections.DISQUALIFIED]
        ?.filter(
          (a) => getDisqualificationStatus(a.status_emails_sent).isNotInvited,
        )
        ?.filter((a) => cardStateManager.disqualified.checkList.list.has(a.id))
        .length > 0 ?? false
    : false;

  const showAssessmentEmailComponent =
    applications && applications[JobApplicationSections.ASSESSMENT]
      ? applications[JobApplicationSections.ASSESSMENT]
          ?.filter((a) => {
            const { isNotInvited, isPending } = getAssessmentStatus(
              a.status_emails_sent,
              {
                created_at: a.assessment_results?.created_at ?? null,
                feedback: a.assessment_results?.feedback ?? null,
              },
            );
            return isNotInvited || isPending;
          })
          ?.filter((a) => cardStateManager.assessment.checkList.list.has(a.id))
          .length > 0 ?? false
      : false;

  const showScreeningEmailComponent =
    applications && applications[JobApplicationSections.SCREENING]
      ? applications[JobApplicationSections.SCREENING]
          ?.filter((a) => {
            const { isNotInvited, isPending } = getScreeningStatus(
              a.status_emails_sent,
              a.phone_screening,
            );
            return isNotInvited || isPending;
          })
          ?.filter((a) => cardStateManager.screening.checkList.list.has(a.id))
          .length > 0 ?? false
      : false;

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
        sections: activeSections,
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
    purposes?: JobApplicationEmails['request']['purposes'],
    applicationIdSet?: Set<string>,
    updateAll: boolean = false,
  ) => {
    if (recruiter) {
      const applicationIds = !updateAll ? [...applicationIdSet] : null;
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
          applicationIds,
          purposes,
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
        sections: activeSections,
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

  const handleSelectSection = (section: JobApplicationSections) => {
    setSection(section);
  };

  const handleSelectNextSection = () => {
    setSection(
      (prev) =>
        activeSections[
          (activeSections.indexOf(prev) + 1) % activeSections.length
        ],
    );
  };

  const handleSelectPrevSection = () => {
    setSection((prev) => {
      const pos = activeSections.indexOf(prev) - 1;
      return pos < 0
        ? activeSections[activeSections.length]
        : activeSections[pos];
    });
  };

  //SECONDARY
  const handleJobApplicationInit = async () => {
    if (job) {
      const currentActiveSections = Object.values(
        JobApplicationSections,
      ).filter((section) => {
        switch (section) {
          case JobApplicationSections.NEW:
            return true;
          case JobApplicationSections.SCREENING:
            return true;
          case JobApplicationSections.ASSESSMENT:
            return job?.assessment ?? false;
          case JobApplicationSections.QUALIFIED:
            return true;
          case JobApplicationSections.DISQUALIFIED:
            return true;
        }
      });
      setCardStateManager(
        Object.assign(
          {},
          ...currentActiveSections.map((a) => ({
            [a]: {
              checkList: {
                list: new Set<string>(),
                disabled: false,
              },
              disabledList: new Set<string>(),
            },
          })),
        ),
      );
      const confirmation = await handleJobApplicationRead({
        job_id: jobId,
        ranges: ranges,
        sections: currentActiveSections,
        ...searchParameters,
      });
      if (!confirmation) {
        const action: Action = {
          type: ActionType.READ,
          payload: {
            activeSections: currentActiveSections,
            applicationData: Object.assign(
              {},
              ...currentActiveSections.map((section) => ({
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
    } else {
      handleJobApplicationNotFound();
    }
  };

  const handleJobApplicationNotFound = () => {
    const action: Action = {
      type: ActionType.NOT_FOUND,
    };
    dispatch(action);
  };

  const getSectionVisibilities = () => {
    return Object.assign(
      {},
      ...Object.values(JobApplicationSections).map((s) => {
        switch (s) {
          case JobApplicationSections.NEW:
            return { [s]: initialJobLoad };
          case JobApplicationSections.SCREENING:
            return {
              [s]: initialJobLoad && section !== JobApplicationSections.NEW,
            };
          case JobApplicationSections.ASSESSMENT:
            return {
              [s]:
                initialJobLoad &&
                section !== JobApplicationSections.NEW &&
                section !== JobApplicationSections.SCREENING &&
                job?.assessment,
            };
          case JobApplicationSections.QUALIFIED:
            return { [s]: initialJobLoad };
          case JobApplicationSections.DISQUALIFIED:
            return {
              [s]:
                initialJobLoad &&
                section === JobApplicationSections.DISQUALIFIED,
            };
        }
      }),
      // eslint-disable-next-line no-unused-vars
    ) as { [key in JobApplicationSections]: boolean };
  };

  const views = getSectionVisibilities();

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
    activeSections,
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
    handleSelectPrevSection,
    handleSelectSection,
    handleSelectNextSection,
    defaultFilters,
    searchParameters,
    initialLoad,
    views,
    showDisqualificationEmailComponent,
    showAssessmentEmailComponent,
    showScreeningEmailComponent,
  };

  return value;
};

export default useProviderJobApplicationActions;
