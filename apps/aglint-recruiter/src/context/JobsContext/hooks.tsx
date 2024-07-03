/* eslint-disable security/detect-object-injection */
import { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';
import { useAuthDetails } from '@context/AuthContext/AuthContext';
import { useMemo } from 'react';

import { handleJobApi } from '@/src/apiUtils/job/utils';
import {
  useJobCreate,
  useJobDelete,
  useJobRead,
  useJobRefresh,
  useJobUIUpdate,
  useJobUpdate,
} from '@/src/queries/jobs';
import { Job } from '@/src/queries/jobs/types';

import { hashCode } from '../JobDashboard/hooks';

const JOB_SECTIONS: DatabaseEnums['application_status'][] = [
  'new',
  'screening',
  'assessment',
  'interview',
  'qualified',
  'disqualified',
];

export const getActiveSection = ({
  isAssessmentEnabled,
  isSchedulingEnabled,
  isScreeningEnabled,
  job,
}: {
  isAssessmentEnabled: boolean;
  isSchedulingEnabled: boolean;
  isScreeningEnabled: boolean;
  job: Pick<
    DatabaseTable['public_jobs'],
    'phone_screen_enabled' | 'assessment'
  >;
}) =>
  JOB_SECTIONS.filter((section) => {
    switch (section) {
      case 'new':
        return true;
      case 'screening':
        return (job?.phone_screen_enabled ?? false) && isScreeningEnabled;
      case 'assessment':
        return (job?.assessment ?? false) && isAssessmentEnabled;
      case 'interview':
        return isSchedulingEnabled;
      case 'qualified':
        return true;
      case 'disqualified':
        return true;
    }
  });

export const useJobActiveSections = (
  job: Pick<
    DatabaseTable['public_jobs'],
    'phone_screen_enabled' | 'assessment'
  >,
) => {
  const { isAssessmentEnabled, isSchedulingEnabled, isScreeningEnabled } =
    useAuthDetails();
  return getActiveSection({
    isAssessmentEnabled,
    isSchedulingEnabled,
    isScreeningEnabled,
    job,
  });
};

const useJobActions = () => {
  const {
    recruiter,
    isAssessmentEnabled,
    isSchedulingEnabled,
    isScreeningEnabled,
  } = useAuthDetails();

  const jobs = useJobRead();
  const customJobs = useMemo(
    () => ({
      ...jobs,
      data: (jobs?.data ?? []).map((job) => {
        const activeSections = getActiveSection({
          isAssessmentEnabled,
          isSchedulingEnabled,
          isScreeningEnabled,
          job: {
            assessment: job?.assessment,
            phone_screen_enabled: job?.phone_screen_enabled,
          },
        });
        return { ...job, activeSections };
      }),
    }),
    [
      jobs,
      jobs.status,
      isScreeningEnabled,
      isAssessmentEnabled,
      isSchedulingEnabled,
    ],
  );

  const { mutateAsync: jobAsyncUpdate, mutate: jobUpdate } = useJobUpdate();
  const { mutateAsync: jobCreate } = useJobCreate();
  const { mutate: jobUIUpdate } = useJobUIUpdate();
  const { mutate: jobDelete } = useJobDelete();
  const { mutate: jobRefresh } = useJobRefresh();
  const { refetch: jobRead } = jobs;

  const initialLoad = !!(!jobs.isPending && recruiter?.id);

  const handleJobRead = async () => {
    if (recruiter) {
      await jobRead();
    }
  };

  const handleJobCreate = async (newJob: Parameters<typeof jobCreate>[0]) => {
    if (recruiter) {
      try {
        const data = await jobCreate(newJob);
        await experimental_handleGenerateJd(data.id);
        return data;
      } catch {
        //
      }
    }
  };

  const handleJobPublish = async (job: Job) => {
    if (recruiter) {
      try {
        // eslint-disable-next-line no-unused-vars
        const { count, processing_count, activeSections, ...newJob } = job;
        await jobAsyncUpdate({
          ...newJob,
          ...newJob.draft,
          status: 'published',
          description_hash: hashCode(newJob.draft.description),
        });
        return true;
      } catch {
        return false;
      }
    }
  };

  const handleJobUpdate = async (
    jobId: string,
    job: Omit<Parameters<typeof jobUpdate>[0], 'recruiter_id'>,
  ) => {
    if (recruiter) {
      jobUpdate({ ...job, id: jobId, recruiter_id: recruiter.id });
    }
  };

  const handleJobAsyncUpdate = async (
    jobId: string,
    job: Omit<Parameters<typeof jobUpdate>[0], 'recruiter_id'>,
  ) => {
    if (recruiter) {
      try {
        return await jobAsyncUpdate({
          ...job,
          id: jobId,
          recruiter_id: recruiter.id,
        });
      } catch {
        //
      }
    }
  };

  const handleUIJobUpdate = (newJob: Job) => {
    if (recruiter) {
      jobUIUpdate(newJob);
    }
  };

  const handleJobDelete = async (jobId: string) => {
    if (recruiter) {
      jobDelete(jobId);
    }
  };

  const handleJobRefresh = async (jobId: string) => {
    if (recruiter) {
      jobRefresh(jobId);
    }
  };

  const experimental_handleGenerateJd = async (jobId: string) => {
    handleGenerateJd(jobId);
    handleJobRefresh(jobId);
  };

  const experimental_handleRegenerateJd = async (job: Job) => {
    await handleJobAsyncUpdate(job?.id, {
      scoring_criteria_loading: true,
    });
    await handleGenerateJd(job.id);
  };

  const handleGetJob = (jobId: string) => {
    return (jobs?.data ?? []).find((job) => job.id === jobId);
  };

  const value = {
    jobs: customJobs,
    handleJobRead,
    handleJobCreate,
    handleJobAsyncUpdate,
    handleJobUpdate,
    handleUIJobUpdate,
    handleJobDelete,
    handleGetJob,
    handleJobRefresh,
    handleJobPublish,
    experimental_handleGenerateJd,
    experimental_handleRegenerateJd,
    initialLoad,
  };

  return value;
};

export default useJobActions;

const handleGenerateJd = async (job_id: string) => {
  return await handleJobApi('profileScore', { job_id });
};
