import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { isEqual } from 'lodash';
import { useParams } from 'next/navigation';
import {
  createContext,
  memo,
  type PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import {
  getDetailsValidity,
  getHiringTeamValidity,
  validateDescription,
  validateJd,
} from '@/job/utils';
import { useJobs } from '@/jobs/hooks';
import type { Job } from '@/jobs/types';
import { jobQueries, useInvalidateJobQueries, useJobSync } from '@/queries/job';
import {
  useUploadApplication,
  useUploadCsv,
  useUploadResume,
} from '@/queries/job';
import { useJobUpdate } from '@/queries/jobs';
import toast from '@/utils/toast';

import { useCurrentJob } from '../hooks/useCurrentJob';

const useJobContext = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  if (!params.job)
    throw Error(
      'Invalid pathname, context must be wrapped to a page with [job]',
    );

  const { recruiter_id, recruiter } = useAuthDetails();
  const { isScoringEnabled } = useRolesAndPermissions();
  const { mutateAsync: syncJob } = useJobSync();

  const {
    jobs,
    initialLoad: jobsLoad,
    manageJob,
    devlinkProps,
    handleGenerateJd,
  } = useJobs();

  const jobLoad = useMemo(
    () => !!(recruiter_id && jobsLoad),
    [recruiter_id, jobsLoad],
  );

  const { job_id } = useCurrentJob();

  const job = useMemo(
    () =>
      jobLoad
        ? ((jobs.data ?? []).find((job) => job.id === job_id) ?? null)
        : undefined,
    [jobs.data, job_id, jobs.status, jobLoad],
  );

  const scoringCriteriaLoading =
    isScoringEnabled && job?.scoring_criteria_loading;

  const total = useMemo(
    () =>
      Object.values(job?.section_count ?? {}).reduce((acc, curr) => {
        acc += curr;
        return acc;
      }, 0),
    [job?.section_count],
  );

  const scoreParameterPollEnabled = !!job && scoringCriteriaLoading;

  const applicationScoringPollEnabled =
    !!job &&
    isScoringEnabled &&
    job.status === 'published' &&
    (job.processing_count.fetching !== 0 ||
      job.processing_count.processing !== 0);

  const jobPolling =
    !!job && (scoreParameterPollEnabled || applicationScoringPollEnabled);

  const jdValidity = !validateJd(job?.draft?.jd_json);

  const status = job &&
    jobLoad && {
      loading: scoringCriteriaLoading,
      description_error:
        !scoringCriteriaLoading &&
        validateDescription(job?.draft?.description ?? ''),
      description_changed:
        !job.scoring_criteria_loading &&
        !isEqual(
          {
            department_id: job.draft.department_id,
            description: job.draft.description,
            job_title: job.draft.job_title,
            job_type: job.draft.job_type,
            workplace_type: job.draft.workplace_type,
            location_id: job.draft.location_id,
          } as Omit<Job['draft'], 'jd_json'>,
          {
            department_id: job.department_id,
            description: job.description,
            job_title: job.job_title,
            job_type: job.job_type,
            workplace_type: job.workplace_type,
            location_id: job.location_id,
          } as Omit<Job['draft'], 'jd_json'>,
        ),
      jd_json_error: !job.scoring_criteria_loading && !jdValidity,
      scoring_criteria_changed:
        !job.scoring_criteria_loading &&
        !isEqual(job.draft.jd_json, job.jd_json),
    };

  const interviewPlans = useQuery(jobQueries.interview_plans({ id: job_id }));

  const { mutateAsync: jobAsyncUpdate, mutate: jobUpdate } = useJobUpdate();

  const handleJobUpdate = async (
    job: Omit<Parameters<typeof jobUpdate>[0], 'recruiter_id'>,
  ) => {
    if (recruiter) {
      jobUpdate({ ...job, id: job_id, recruiter_id: recruiter.id });
    }
  };

  const handleJobAsyncUpdate = async (
    job: Omit<Parameters<typeof jobUpdate>[0], 'recruiter_id'>,
  ) => {
    if (recruiter) {
      try {
        return await jobAsyncUpdate({
          ...job,
          id: job_id,
          recruiter_id: recruiter.id,
        });
      } catch {
        //
      }
    }
  };

  const handleJobSync = async () => {
    try {
      await syncJob({ job_id, recruiter_id });
    } catch {
      //
    }
  };

  const detailsValidity = getDetailsValidity(job);
  const hiringTeamValidity = getHiringTeamValidity(job);

  const publishStatus = {
    detailsValidity,
    hiringTeamValidity,
    jdValidity,
    loading: scoringCriteriaLoading,
    publishable:
      detailsValidity.validity &&
      hiringTeamValidity.validity &&
      jdValidity &&
      !scoringCriteriaLoading,
  };

  const canPublish =
    job?.status === 'draft' ||
    status?.description_changed ||
    status?.scoring_criteria_changed;

  const handlePublish = async () => {
    if (publishStatus.publishable) {
      const {
        // eslint-disable-next-line no-unused-vars
        processing_count: _processing_count,
        // eslint-disable-next-line no-unused-vars
        section_count: _section_count,
        // eslint-disable-next-line no-unused-vars
        application_match: _application_match,
        // eslint-disable-next-line no-unused-vars
        department: _department,
        // eslint-disable-next-line no-unused-vars
        location: _location,
        ...safeJob
      } = job;
      await handleJobAsyncUpdate({
        ...safeJob,
        ...safeJob.draft,
        status: 'published',
      });
      return true;
    } else {
      if (publishStatus.loading)
        toast.warning(
          'Generating profile score criteria. Please wait before publishing.',
        );
      else {
        if (!detailsValidity.validity || !hiringTeamValidity.validity) {
          if (!detailsValidity.validity) toast.error(detailsValidity.message);
          if (!hiringTeamValidity.validity)
            toast.error(hiringTeamValidity.message);
        } else {
          toast.error('Unable to publish. Please verify the job details.');
        }
      }
    }
  };

  const handleRegenerateJd = async (job: Job) => {
    await handleJobAsyncUpdate({
      scoring_criteria_loading: true,
    });
    await handleGenerateJd(job.id, true);
  };

  const { mutateAsync: handleUploadApplication } = useUploadApplication({
    job_id,
  });
  const { mutateAsync: handleUploadResume } = useUploadResume({
    job_id,
  });
  const { mutateAsync: handleUploadCsv } = useUploadCsv({
    job_id,
  });

  const { revalidateJobQueries } = useInvalidateJobQueries();

  useQueries({
    queries: [
      jobQueries.job({
        id: job_id,
        enabled: !!job,
        initialData: job,
        queryClient,
      }),
      jobQueries.polling({
        id: job_id,
        enabled: jobPolling,
        queryClient,
      }),
    ],
  });

  const initialRef = useRef(true);

  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      return;
    }
    if (!jobPolling) {
      revalidateJobQueries(job_id);
    }
  }, [jobPolling]);

  return {
    job,
    recruiter_id,
    total,
    job_id,
    jobLoad,
    scoreParameterPollEnabled,
    applicationScoringPollEnabled,
    jobPolling,
    interviewPlans,
    revalidateJobQueries: () => revalidateJobQueries(job_id),
    handleJobAsyncUpdate,
    handleJobUpdate,
    handleRegenerateJd,
    handleUploadApplication,
    handleUploadResume,
    handleUploadCsv,
    handleJobSync,
    canPublish,
    handlePublish,
    publishStatus,
    status,
    jdValidity,
    manageJob,
    devlinkProps,
  };
};

export const JobContext = createContext<ReturnType<typeof useJobContext>>(null);

export const JobProvider = memo((props: PropsWithChildren) => {
  const value = useJobContext();
  return (
    <JobContext.Provider value={value}>{props.children}</JobContext.Provider>
  );
});
JobProvider.displayName = 'JobProvider';
