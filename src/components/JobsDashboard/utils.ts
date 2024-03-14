import dayjs from 'dayjs';

import { selectJobApplicationQuery } from '@/src/pages/api/job/jobApplications/read/utils';
import { JobApplcationDB } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabase/client';

import { JobType, Status } from './types';

export const fetchJobs = (recruiter_id) => {
  return supabase
    .from('public_jobs')
    .select()
    .order('created_at', { ascending: false })
    .eq('recruiter_id', recruiter_id)
    .then(({ data, error }) => {
      if (!error) {
        return data;
      } else {
        return [];
      }
    });
};

export function filterJobsByStatus(
  jobs: JobType[],
  statusToFilter: Status
): JobType[] {
  return jobs.filter((job) => job.status === statusToFilter);
}

export const fetchApplications = (jobIds) => {
  return supabase
    .from('job_applications')
    .select(`${selectJobApplicationQuery}`)
    .in('job_id', jobIds)
    .then(({ data, error }) => {
      if (!error) {
        return data;
      } else {
        return [];
      }
    });
};

export function filterApplicationsByStatus(
  jobId: string,
  applications: any,
  statusToFilter?: string
): JobApplcationDB[] {
  if (statusToFilter) {
    return applications.filter(
      (app) => app.status === statusToFilter && app.job_id === jobId
    );
  } else {
    return applications.filter((app) => app.job_id === jobId);
  }
}

export const StatusColor = Object.freeze({
  inactive: '#ED8F1C',
  active: '#228F67',
  closed: '#D93F4C'
});

export function calculateTimeDifference(postedDate) {
  const now = dayjs();
  const posted = dayjs(postedDate);
  const diff = now.diff(posted, 'second'); // Calculate the difference in seconds

  if (diff < 60) {
    return 'Just now';
  } else if (diff < 3600) {
    return `${Math.floor(diff / 60)} minutes ago`;
  } else if (diff < 86400) {
    return `${Math.floor(diff / 3600)} hours ago`;
  } else {
    return `${Math.floor(diff / 86400)} days ago`;
  }
}

export function searchJobs(jobs: any[], searchString: string) {
  const search = searchString.toLowerCase();

  // Use the filter method to search for matching job titles or statuses

  if (search) {
    const filteredData = jobs.filter((item) => {
      const jobTitle = item.job_title.toLowerCase();
      // const status = item.status.toLowerCase();

      // Check if the job title or status contains the search string
      return jobTitle.includes(search);
      // || status.includes(search);
    });

    return filteredData;
  } else {
    return jobs;
  }
}

export function sendEmail() {
  window.location.href =
    'mailto:admin@aglinthq.com?subject=Requesting for new ATS integration&body=';
}

export function sortJobs(jobs) {
  return jobs.sort((a, b) => {
    const statusOrder = {
      published: 1,
      draft: 2,
      closed: 3
    };

    const orderA = statusOrder[a.status] || 0;
    const orderB = statusOrder[b.status] || 0;

    return orderA - orderB;
  });
}
