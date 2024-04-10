/* eslint-disable security/detect-object-injection */
import { useAuthDetails } from '@context/AuthContext/AuthContext';
import { cloneDeep } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useReducer, useRef, useState } from 'react';

import { usePolling } from '@/src/components/JobApplicationsDashboard/hooks';
import {
  checkSyncCand,
  FilterParameter,
  getAssessmentStatus,
  getDisqualificationStatus,
  getScreeningStatus,
} from '@/src/components/JobApplicationsDashboard/utils';
import { POSTED_BY } from '@/src/components/JobsDashboard/AddJobWithIntegrations/utils';
import { JobApplicationDelete } from '@/src/pages/api/job/jobApplications/candidateDelete';
import { JobApplicationEmails } from '@/src/pages/api/job/jobApplications/candidateEmail';
import { getSafeAssessmentResult } from '@/src/pages/api/job/jobApplications/candidateEmail/utils';
import { ReadJobApplicationApi } from '@/src/pages/api/job/jobApplications/read';
import { handleJobApplicationApi } from '@/src/pages/api/job/jobApplications/utils';
import { EmailTemplateType } from '@/src/types/data.types';
import { getFullName } from '@/src/utils/jsonResume';
import toast from '@/src/utils/toast';

import { useJobDetails } from '../JobDashboard';
import { useJobs } from '../JobsContext';
import { CountJobs } from '../JobsContext/types';
import {
  CardStateManager,
  JobApplication,
  JobApplicationsData,
  JobApplicationSections,
  Parameters,
} from './types';
import { getRange, recalculateDbAction, rescoreDbAction } from './utils';
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
  const { recruiter, recruiterUser } = useAuthDetails();

  const router = useRouter();
  const { jobsData, initialLoad: jobLoad, handleUIJobUpdate } = useJobs();
  const { handleJobRefresh, jobPolling } = useJobDetails();
  const jobId = job_id ?? (router.query?.id as string);

  const [applications, dispatch] = useReducer(reducer, undefined);

  const [actionProps, setActionProps] = useState({
    open: false,
    destination: null,
  });

  const [selectAll, setSelectAll] = useState(false);

  const paginationLimit = 50;
  const longPolling = 10000;

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

  const [cardStateManager, setCardStateManager] =
    useState<CardStateManager>(undefined);
  const activeSections = useMemo(
    () =>
      Object.values(JobApplicationSections).filter((section) => {
        switch (section) {
          case JobApplicationSections.NEW:
            return true;
          case JobApplicationSections.SCREENING:
            return job?.phone_screen_enabled ?? false;
          case JobApplicationSections.ASSESSMENT:
            return job?.assessment ?? false;
          case JobApplicationSections.INTERVIEW:
            return true;
          case JobApplicationSections.QUALIFIED:
            return true;
          case JobApplicationSections.DISQUALIFIED:
            return true;
        }
      }),
    [job],
  );
  const [section, setSection] = useState<JobApplicationSections>(
    JobApplicationSections.NEW,
  );
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

  const ranges = Object.values(JobApplicationSections)
    .filter((section) => initialJobLoad && activeSections.includes(section))
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

  //PRIMARY
  const handleJobApplicationRead = async (
    request: ReadJobApplicationApi['request'],
    signal?: AbortSignal,
  ) => {
    if (recruiter) {
      const responses = await Promise.allSettled([
        handleJobRefresh(),
        handleJobApplicationApi('read', request, signal),
      ]);
      if (responses[1].status === 'fulfilled') {
        const { data, error, filteredCount } = responses[1].value;
        if (data) {
          const action: Action = {
            type: ActionType.READ,
            payload: {
              applicationData: data,
              activeSections: request.sections,
            },
          };
          if (job?.posted_by == POSTED_BY.ASHBY) {
            const is_sync = await checkSyncCand(job);
            setAtsSync(is_sync);
          }
          // handleUIJobUpdate({ ...job, count: unFilteredCount });
          dispatch(action);
          return { confirmation: true, filteredCount };
        }
        if (initialLoad) handleJobApplicationError(error);
      } else handleJobApplicationError('Something went wrong');
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
              getSafeAssessmentResult(a.assessment_results),
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
    task: boolean,
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
            job_title: job.job_title,
            company: job.company,
            recruiter_id: job.recruiter_id,
            recruiterUser: {
              id: recruiterUser.user_id,
              name: getFullName(
                recruiterUser.first_name,
                recruiterUser.last_name,
              ),
            },
            email_template: job.email_template as unknown as EmailTemplateType,
          },
          parameter: {
            ranges,
            ...searchParameters,
          },
          task,
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
        return { confirmation: true, filteredCount };
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
  const handleJobApplicationDelete = async (
    applicationIdSet: Set<string>,
    deleteAll: boolean = false,
    clearCandidate: boolean = false,
  ) => {
    if (recruiter) {
      const safeApplications = !deleteAll
        ? applications[section].reduce(
            (acc, curr) => {
              if (applicationIdSet.has(curr.id))
                acc.push({
                  id: curr.id,
                  candidate_id: curr.candidate_id,
                  email: curr.candidates.email,
                });
              return acc;
            },
            [] as JobApplicationDelete['request']['applications'],
          )
        : null;
      const { data, error, filteredCount, unFilteredCount } =
        await handleJobApplicationApi('candidateDelete', {
          jobId: job.id,
          applications: safeApplications,
          section,
          clearCandidate,
          parameter: {
            ranges,
            ...searchParameters,
          },
        });
      if (data) {
        const action: Action = {
          type: ActionType.SECTION_READ,
          payload: { applicationData: data },
        };
        handleUIJobUpdate({
          ...job,
          count: { ...job.count, ...unFilteredCount },
        });
        dispatch(action);
        return {
          confirmation: true,
          filteredCount,
          unFilteredCount,
        };
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

  const handleJobApplicationRescore = async () => {
    if (recruiter) {
      await rescoreDbAction(job.id);
      handleJobApplicationRefresh();
    }
  };

  const handleJobApplicationRecalculate = async () => {
    if (recruiter) {
      await recalculateDbAction(job?.id);
      handleJobApplicationRefresh();
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
        ? activeSections[activeSections.length - 1]
        : activeSections[pos];
    });
  };

  //SECONDARY
  const handleJobApplicationInit = async () => {
    if (job) {
      setCardStateManager(
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
        ),
      );
      const confirmation = await handleJobApplicationRead({
        job_id: jobId,
        ranges: ranges,
        sections: activeSections,
        ...searchParameters,
      });
      if (!confirmation) {
        const action: Action = {
          type: ActionType.READ,
          payload: {
            activeSections: activeSections,
            applicationData: Object.assign(
              {},
              ...activeSections.map((section) => ({
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
        const defaults = initialJobLoad && activeSections.includes(s);
        switch (s) {
          case JobApplicationSections.NEW:
            return { [s]: defaults };
          case JobApplicationSections.SCREENING:
            return {
              [s]: defaults && section !== JobApplicationSections.NEW,
            };
          case JobApplicationSections.ASSESSMENT:
            return {
              [s]:
                defaults &&
                section !== JobApplicationSections.NEW &&
                section !== JobApplicationSections.SCREENING,
            };
          case JobApplicationSections.INTERVIEW: {
            return {
              [s]: defaults && section === JobApplicationSections.INTERVIEW,
            };
          }
          case JobApplicationSections.QUALIFIED:
            return { [s]: defaults };
          case JobApplicationSections.DISQUALIFIED:
            return {
              [s]: defaults && section === JobApplicationSections.DISQUALIFIED,
            };
        }
      }),
      // eslint-disable-next-line no-unused-vars
    ) as { [key in JobApplicationSections]: boolean };
  };

  const views = getSectionVisibilities();

  const actionVisibilities = {
    new:
      section === JobApplicationSections.DISQUALIFIED &&
      activeSections.includes(JobApplicationSections.NEW),
    screening:
      section === JobApplicationSections.NEW &&
      activeSections.includes(JobApplicationSections.SCREENING),
    assessment:
      (section === JobApplicationSections.NEW ||
        section === JobApplicationSections.SCREENING) &&
      activeSections.includes(JobApplicationSections.ASSESSMENT),
    interview:
      (section === JobApplicationSections.NEW ||
        section === JobApplicationSections.SCREENING ||
        section === JobApplicationSections.ASSESSMENT) &&
      activeSections.includes(JobApplicationSections.INTERVIEW),
    qualified:
      (section === JobApplicationSections.NEW ||
        section === JobApplicationSections.SCREENING ||
        section === JobApplicationSections.ASSESSMENT ||
        section === JobApplicationSections.INTERVIEW) &&
      activeSections.includes(JobApplicationSections.QUALIFIED),
    disqualified:
      (section === JobApplicationSections.NEW ||
        section === JobApplicationSections.SCREENING ||
        section === JobApplicationSections.ASSESSMENT ||
        section === JobApplicationSections.INTERVIEW ||
        section === JobApplicationSections.QUALIFIED) &&
      activeSections.includes(JobApplicationSections.DISQUALIFIED),
  };

  const refreshRef = useRef(true);

  const handleAutoRefresh = async () => {
    if (jobPolling) await handleRefresh();
  };

  const handleManualRefresh = async () => {
    refreshRef.current = !refreshRef.current;
    await handleRefresh();
  };

  const handleRefresh = async () => {
    setAllApplicationsDisabled(true);
    await handleJobApplicationRefresh();
    setAllApplicationsDisabled(false);
  };

  usePolling(async () => await handleAutoRefresh(), longPolling, [
    ...Object.values(pageNumber),
    section,
    refreshRef.current,
    searchParameters.search,
    searchParameters.sort.ascending,
    searchParameters.sort.parameter,
    jobPolling,
  ]);

  useEffect(() => {
    if (initialJobLoad) {
      handleJobApplicationInit();
    }
  }, [initialJobLoad, job?.id]);

  const value = {
    applications,
    handleJobApplicationRescore,
    handleJobApplicationRecalculate,
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
    handleJobApplicationDelete,
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
    actionProps,
    selectAll,
    setSelectAll,
    setActionProps,
    actionVisibilities,
  };

  return value;
};

export default useProviderJobApplicationActions;
