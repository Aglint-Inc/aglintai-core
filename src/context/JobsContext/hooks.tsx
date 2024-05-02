/* eslint-disable security/detect-object-injection */
import { useAuthDetails } from '@context/AuthContext/AuthContext';

import { handleJobApi } from '@/src/pages/api/job/utils';
import {
  useJobCreate,
  useJobDelete,
  useJobRead,
  useJobRefresh,
  useJobUIUpdate,
  useJobUpdate,
} from '@/src/queries/job';
import { JobInsert } from '@/src/queries/job/types';

import { hashCode } from '../JobDashboard/hooks';
import { JobTypeDashboard } from './types';

const useJobActions = () => {
  const { recruiter } = useAuthDetails();

  const jobs = useJobRead();
  const { mutateAsync: jobAsyncUpdate, mutate: jobUpdate } = useJobUpdate();
  const { mutateAsync: jobCreate } = useJobCreate();
  const { mutate: jobUIUpdate } = useJobUIUpdate();
  const { mutate: jobDelete } = useJobDelete();
  const { mutate: jobRefresh } = useJobRefresh();
  const { refetch: jobRead } = jobs;

  const jobsData = { jobs: jobs.data };

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

  const handleJobPublish = async (job: JobTypeDashboard) => {
    if (recruiter) {
      try {
        // eslint-disable-next-line no-unused-vars
        const { count, processing_count, ...newJob } = job;
        const { error } = await jobAsyncUpdate({
          ...newJob,
          ...newJob.draft,
          status: 'published',
          description_hash: hashCode(newJob.draft.description),
        });
        if (error) return false;
        return true;
      } catch {
        return false;
      }
    }
  };

  const handleJobUpdate = async (
    jobId: string,
    newJob: Omit<JobInsert, 'recruiter_id'>,
  ) => {
    if (recruiter) {
      jobUpdate({
        id: jobId,
        ...newJob,
        recruiter_id: recruiter.id,
      });
    }
  };

  const handleJobAsyncUpdate = async (
    jobId: string,
    newJob: Omit<JobInsert, 'recruiter_id'>,
  ) => {
    if (recruiter) {
      try {
        return await jobAsyncUpdate({
          id: jobId,
          ...newJob,
          recruiter_id: recruiter.id,
        });
      } catch {
        //
      }
    }
  };

  const handleUIJobUpdate = (newJob: JobTypeDashboard) => {
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

  const experimental_handleRegenerateJd = async (job: JobTypeDashboard) => {
    handleUIJobUpdate({ ...job, scoring_criteria_loading: true });
    await handleGenerateJd(job.id);
    // handleJobRefresh(job.id);
  };

  const handleGetJob = (jobId: string) => {
    return jobsData.jobs.find((job) => job.id === jobId);
  };

  const value = {
    jobs,
    jobsData,
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
