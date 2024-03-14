/* eslint-disable security/detect-object-injection */
import { useAuthDetails } from '@context/AuthContext/AuthContext';

import { handleJobApi } from '@/src/pages/api/job/utils';
import {
  useJobCreate,
  useJobDelete,
  useJobRead,
  useJobRefresh,
  useJobUIUpdate,
  useJobUpdate
} from '@/src/queries/job';

import { JobTypeDashboard } from './types';

const useJobActions = () => {
  const { recruiter } = useAuthDetails();

  const jobs = useJobRead();
  const { mutateAsync: jobAsyncUpdate } = useJobUpdate();
  const { mutateAsync: jobCreate } = useJobCreate();
  const { mutate: jobUIUpdate } = useJobUIUpdate();
  const { mutate: jobDelete } = useJobDelete();
  const { mutate: jobRefresh } = useJobRefresh();
  const { refetch: jobRead } = jobs;

  const jobsData = { jobs: jobs.data };

  const initialLoad = !!(jobs.status !== 'pending' && recruiter?.id);

  const handleJobRead = async () => {
    if (recruiter) {
      await jobRead();
    }
  };

  const handleJobCreate = async (newJob: Parameters<typeof jobCreate>[0]) => {
    if (recruiter) {
      try {
        const data = await jobCreate(newJob);
        experimental_handleGenerateJd(data.id);
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
        const { count, ...newJob } = job;
        const { error } = await jobAsyncUpdate({
          ...newJob,
          ...newJob.draft,
          status: 'published'
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
    newJob: Partial<JobTypeDashboard>
  ) => {
    if (recruiter) {
      try {
        return await jobAsyncUpdate({
          id: jobId,
          ...newJob,
          recruiter_id: recruiter.id
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
    await handleGenerateJd(jobId);
    handleJobRefresh(jobId);
  };

  const handleGetJob = (jobId: string) => {
    return jobsData.jobs.find((job) => job.id === jobId);
  };

  const value = {
    jobs,
    jobsData,
    handleJobRead,
    handleJobCreate,
    handleJobUpdate,
    handleUIJobUpdate,
    handleJobDelete,
    handleGetJob,
    handleJobRefresh,
    handleJobPublish,
    experimental_handleGenerateJd,
    initialLoad
  };

  return value;
};

export default useJobActions;

const handleGenerateJd = async (job_id: string) => {
  const response = await handleJobApi('profileScore', { job_id });
  // eslint-disable-next-line no-console
  console.log(response);
};
