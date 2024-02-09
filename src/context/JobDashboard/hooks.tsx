/* eslint-disable security/detect-object-injection */

import { PostgrestError } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { JobDashboardApi } from '@/src/pages/api/jobDashboard/read';
import { handleJobDashboardApi } from '@/src/pages/api/jobDashboard/utils';
import toast from '@/src/utils/toast';

import { useAuthDetails } from '../AuthContext/AuthContext';
import { useJobs } from '../JobsContext';

const useProviderJobDashboardActions = (job_id: string = undefined) => {
  const { recruiter } = useAuthDetails();
  const router = useRouter();
  const { jobsData, initialLoad: jobLoad } = useJobs();
  const initialJobLoad = recruiter?.id && jobLoad ? true : false;
  const jobId = job_id ?? (router.query?.id as string);
  const job = initialJobLoad
    ? jobsData.jobs.find((job) => job.id === jobId)
    : undefined;

  const [analytics, setAnalytics] =
    useState<JobDashboardApi['response']['data']>(undefined);

  const initialLoad = initialJobLoad && analytics !== undefined ? true : false;

  const handleReadAnalytics = async () => {
    const { data, error } = await handleJobDashboardApi('read', {
      job_id: jobId,
    });
    handleJobDashboardError(error);
    setAnalytics(data);
  };

  const handleJobDashboardError = (error: { [id: string]: PostgrestError }) => {
    const errors = Object.entries(error).reduce((acc, [key, value]) => {
      if (value) acc.push(`${key}: ${value}`);
      return acc;
    }, []);
    if (errors.length !== 0) toast.error(`${errors.join('\n')}`);
  };

  const handleJobDashboardInit = () => {
    handleReadAnalytics();
  };
  useEffect(() => {
    if (initialJobLoad) {
      handleJobDashboardInit();
    }
  }, [initialJobLoad, job?.id]);

  const value = {
    job,
    initialLoad,
    analytics,
  };

  return value;
};

export default useProviderJobDashboardActions;
