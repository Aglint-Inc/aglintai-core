/* eslint-disable no-unused-vars */
/* eslint-disable security/detect-object-injection */
import { ApplicationsUpdate, EmailTemplateType } from '@aglint/shared-types';
import { useAuthDetails } from '@context/AuthContext/AuthContext';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useRef, useState } from 'react';

import { getSafeAssessmentResult } from '@/src/apiUtils/job/jobApplications/candidateEmail/utils';
import { handleJobApplicationApi } from '@/src/apiUtils/job/jobApplications/utils';
import { TaskType } from '@/src/components/JobApplicationsDashboard/CandidateActions/CreateTask';
import { usePolling } from '@/src/components/JobApplicationsDashboard/hooks';
import {
  checkSyncCand,
  FilterParameter,
  getAssessmentStatus,
  getDisqualificationStatus,
  getScreeningStatus,
} from '@/src/components/JobApplicationsDashboard/utils';
import { POSTED_BY } from '@/src/components/Jobs/Dashboard/AddJobWithIntegrations/utils';
import { JobApplicationDelete } from '@/src/pages/api/job/jobApplications/candidateDelete';
import { JobApplicationEmails } from '@/src/pages/api/job/jobApplications/candidateEmail';
import { ReadJobApplicationApi } from '@/src/pages/api/job/jobApplications/read';
import { getFullName } from '@/src/utils/jsonResume';
import ROUTES from '@/src/utils/routing/routes';
import toast from '@/src/utils/toast';

import { useJobDetails } from '../JobDashboard';
import { useJobInterviewPlan } from '../JobInterviewPlanContext';
import { useJobs } from '../JobsContext';
import { CountJobs } from '../JobsContext/types';
import {
  CardStateManager,
  JobApplication,
  JobApplicationsData,
  JobApplicationSections,
  Parameters,
} from './types';
import {
  getRange,
  recalculateDbAction,
  rescoreDbAction,
  updateJobApplicationDbAction,
} from './utils';
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
      payload: {
        applicationId: string;
        application: Partial<JobApplication>;
        section: JobApplicationSections;
      };
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
          if (key === action.payload.section)
            return {
              [key]: value.map((application) => {
                if (application.id === action.payload.applicationId)
                  return {
                    ...structuredClone(application),
                    ...structuredClone(action.payload.application),
                  };
                return application;
              }),
            };
          return { [key]: value };
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

  const { handleUIJobUpdate } = useJobs();

  const { job, initialLoad: jobLoad, handleJobRefresh } = useJobDetails();

  const interviewPlans = useJobInterviewPlan();

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
            [section]: structuredClone(newValue),
          };
        });
      }
    : undefined;

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

  const ranges = Object.values(JobApplicationSections)
    .filter((section) => initialJobLoad && job.activeSections.includes(section))
    .reduce((acc, curr) => {
      return {
        ...acc,
        [curr]: getRange(pageNumber[curr], paginationLimit),
      };
    }, {}) as ReadJobApplicationApi['request']['ranges'];

  const [allApplicationsDisabled, setAllApplicationsDisabled] = useState(false);

  //PRIMARY
  const handleJobApplicationRead = async (
    request: ReadJobApplicationApi['request'],
    signal?: AbortSignal,
  ) => {
    if (recruiter) {
      const { data, filteredCount } = await handleJobApplicationApi(
        'read',
        request,
        signal,
      );
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
      } else handleJobApplicationError('Unable to fetch applications');
      return {
        confirmation: false,
        filteredCount: null as CountJobs,
        unFilteredCount: null as CountJobs,
      };
    }
  };

  const handleJobApplicationUpdate = async (
    application: Partial<ApplicationsUpdate>,
    applicationId: string,
    optimistic: boolean = false,
  ) => {
    const safeApplication = structuredClone(
      applications[section].find(({ id }) => id === applicationId),
    );
    if (!safeApplication) return;
    if (optimistic) {
      const action: Action = {
        type: ActionType.UPDATE,
        payload: {
          applicationId,
          application,
          section,
        },
      };
      dispatch(action);
    }
    const { error } = await updateJobApplicationDbAction(applicationId, {
      ...structuredClone(application),
    });
    if (error) {
      handleJobApplicationError(error);
      if (optimistic) {
        const action: Action = {
          type: ActionType.UPDATE,
          payload: {
            applicationId,
            application: safeApplication,
            section,
          },
        };
        dispatch(action);
      }
      return;
    }
    const action: Action = {
      type: ActionType.UPDATE,
      payload: {
        applicationId,
        application,
        section,
      },
    };
    dispatch(action);
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
    // if (recruiter) {
    //   const request = {
    //     job_id: jobId,
    //     ranges: ranges,
    //     sections: job.activeSections,
    //     ...searchParameters,
    //   };
    //   const responses = await Promise.allSettled([
    //     handleJobRefresh(),
    //     handleJobApplicationRead(request),
    //   ]);
    //   if (
    //     responses[1].status === 'fulfilled' &&
    //     responses[1].value.confirmation
    //   )
    //     return true;
    // }
    // return false;
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
    task: TaskType,
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
    if (
      router.pathname !== ('/jobs/[id]/candidate-list' as keyof typeof ROUTES)
    )
      return;
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
    setSearchParameters(structuredClone(parameters));
    setAllApplicationsDisabled(true);
    // const { confirmation, filteredCount } = await handleJobApplicationRead(
    //   {
    //     job_id: jobId,
    //     ranges: Object.values(JobApplicationSections)
    //       .filter(
    //         (section) => initialJobLoad && job.activeSections.includes(section),
    //       )
    //       .reduce((acc, curr) => {
    //         return {
    //           ...acc,
    //           [curr]: getRange(
    //             initialJobApplicationPageNumbers[curr],
    //             paginationLimit,
    //           ),
    //         };
    //       }, {}) as ReadJobApplicationApi['request']['ranges'],
    //     sections: job.activeSections,
    //     ...parameters,
    //   },
    //   signal,
    // );
    setAllApplicationsDisabled(false);
    // if (confirmation) {
    //   if (parameters.search) setPageNumber(initialJobApplicationPageNumbers);
    //   return { confirmation: true, filteredCount };
    // }
    setSearchParameters(structuredClone(searchParameters));
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
    // setSection(
    //   (prev) =>
    //     job.activeSections[
    //       (job.activeSections.indexOf(prev) + 1) % job.activeSections.length
    //     ],
    // );
  };

  const handleSelectPrevSection = () => {
    // setSection((prev) => {
    //   const pos = job.activeSections.indexOf(prev) - 1;
    //   return pos < 0
    //     ? job.activeSections[job.activeSections.length - 1]
    //     : job.activeSections[pos];
    // });
  };

  //SECONDARY
  const handleJobApplicationInit = async () => {
    if (job) {
      setCardStateManager(
        Object.assign(
          {},
          ...job.activeSections.map((a) => ({
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
      // const confirmation = await handleJobApplicationRead({
      //   job_id: jobId,
      //   ranges: ranges,
      //   sections: job.activeSections,
      //   ...searchParameters,
      // });
      // if (!confirmation) {
      //   const action: Action = {
      //     type: ActionType.READ,
      //     payload: {
      //       activeSections: job.activeSections,
      //       applicationData: Object.assign(
      //         {},
      //         ...job.activeSections.map((section) => ({
      //           [section]: [],
      //         })),
      //       ) as {
      //         // eslint-disable-next-line no-unused-vars
      //         [key in JobApplicationSections]: JobApplication[];
      //       },
      //     },
      //   };
      //   dispatch(action);
      //   return false;
      // }
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
        const defaults = initialJobLoad && job.activeSections.includes(s);
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

  const handleResetFilters = () => {
    if (
      recruiter &&
      JSON.stringify(searchParameters) !== JSON.stringify(initialParameters)
    ) {
      const request = {
        job_id: jobId,
        ranges: ranges,
        sections: job.activeSections,
        ...initialParameters,
      };
      setSearchParameters(structuredClone(initialParameters));
      // handleJobApplicationRead(request);
    }
  };

  const views = getSectionVisibilities();

  const actionVisibilities = job && {
    new:
      section === JobApplicationSections.DISQUALIFIED &&
      job.activeSections.includes(JobApplicationSections.NEW),
    screening:
      section === JobApplicationSections.NEW &&
      job.activeSections.includes(JobApplicationSections.SCREENING),
    assessment:
      (section === JobApplicationSections.NEW ||
        section === JobApplicationSections.SCREENING) &&
      job.activeSections.includes(JobApplicationSections.ASSESSMENT),
    interview:
      (section === JobApplicationSections.NEW ||
        section === JobApplicationSections.SCREENING ||
        section === JobApplicationSections.ASSESSMENT) &&
      job.activeSections.includes(JobApplicationSections.INTERVIEW),
    qualified:
      (section === JobApplicationSections.NEW ||
        section === JobApplicationSections.SCREENING ||
        section === JobApplicationSections.ASSESSMENT ||
        section === JobApplicationSections.INTERVIEW) &&
      job.activeSections.includes(JobApplicationSections.QUALIFIED),
    disqualified:
      (section === JobApplicationSections.NEW ||
        section === JobApplicationSections.SCREENING ||
        section === JobApplicationSections.ASSESSMENT ||
        section === JobApplicationSections.INTERVIEW ||
        section === JobApplicationSections.QUALIFIED) &&
      job.activeSections.includes(JobApplicationSections.DISQUALIFIED),
  };

  const refreshRef = useRef(true);

  const handleAutoRefresh = async () => {
    // if (jobPolling) await handleRefresh();
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

  const canCreateTask =
    (interviewPlans?.interviewPlans?.data?.interview_session ?? []).length !==
    0;

  usePolling(async () => await handleAutoRefresh(), longPolling, [
    ...Object.values(pageNumber),
    section,
    refreshRef.current,
    searchParameters.search,
    searchParameters.sort.ascending,
    searchParameters.sort.parameter,
    // jobPolling,
  ]);

  useEffect(() => {
    if (initialJobLoad) {
      handleJobApplicationInit();
    }
  }, [initialJobLoad, job?.id]);

  const value = {
    job,
    applications,
    handleJobApplicationRescore,
    handleJobApplicationRecalculate,
    setCardStates,
    cardStates,
    allApplicationsDisabled,
    setAllApplicationsDisabled,
    paginationLimit,
    atsSync,
    pageNumber,
    section,
    setSection,
    handleJobApplicationPaginate,
    handleJobApplicationRefresh,
    handleJobApplicationDelete,
    handleJobApplicationSectionUpdate,
    handleJobApplicationUpdate,
    handleJobApplicationFilter,
    handleManualRefresh,
    handleSelectPrevSection,
    handleSelectSection,
    handleSelectNextSection,
    handleResetFilters,
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
    canCreateTask,
  };

  return value;
};

export default useProviderJobApplicationActions;
