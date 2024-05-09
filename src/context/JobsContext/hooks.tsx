/* eslint-disable security/detect-object-injection */
import { useAuthDetails } from '@context/AuthContext/AuthContext';
import { useMemo } from 'react';

import { handleJobApi } from '@/src/pages/api/job/utils';
import {
  useJobCreate,
  useJobDelete,
  useJobRead,
  useJobRefresh,
  useJobUIUpdate,
  useJobUpdate,
} from '@/src/queries/job';
import { Job } from '@/src/queries/job/types';

import { JobApplicationSections } from '../JobApplicationsContext/types';
import { hashCode } from '../JobDashboard/hooks';

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
        const activeSections = Object.values(JobApplicationSections).filter(
          (section) => {
            switch (section) {
              case JobApplicationSections.NEW:
                return true;
              case JobApplicationSections.SCREENING:
                return (
                  (job?.phone_screen_enabled ?? false) && isScreeningEnabled
                );
              case JobApplicationSections.ASSESSMENT:
                return (job?.assessment ?? false) && isAssessmentEnabled;
              case JobApplicationSections.INTERVIEW:
                return isSchedulingEnabled;
              case JobApplicationSections.QUALIFIED:
                return true;
              case JobApplicationSections.DISQUALIFIED:
                return true;
            }
          },
        );
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
    handleUIJobUpdate({ ...job, scoring_criteria_loading: true });
    await handleGenerateJd(job.id);
    // handleJobRefresh(job.id);
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
