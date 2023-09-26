import dayjs from 'dayjs';

import { JobDB } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabaseClient';

import { JobType, Status } from './types';

export const fetchJobs = () => {
  return supabase
    .from('public_jobs')
    .select()
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
  statusToFilter: Status,
): JobType[] {
  return jobs.filter((job) => job.status === statusToFilter);
}

export const fetchApplications = (jobIds) => {
  return supabase
    .from('job_applications')
    .select()
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
  applications: JobDB[],
  statusToFilter?: string,
): JobDB[] {
  if (statusToFilter) {
    return applications.filter(
      (app) => app.status === statusToFilter && app.job_id === jobId,
    );
  } else {
    return applications.filter((app) => app.job_id === jobId);
  }
}

export const StatusColor = Object.freeze({
  draft: '#fff7ed',
  interviewing: '#f5fcfc',
  sourcing: '#edf7ff',
  closed: '#fff0f1',
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

export function searchJobs(jobs, searchString) {
  const search = searchString.toLowerCase();

  // Use the filter method to search for matching job titles or statuses
  const filteredData = jobs.filter((item) => {
    const jobTitle = item.job_title.toLowerCase();
    const status = item.status.toLowerCase();

    // Check if the job title or status contains the search string
    return jobTitle.includes(search) || status.includes(search);
  });

  return filteredData;
}
