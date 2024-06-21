import { DatabaseTable, JobApplcationDB } from '@aglint/shared-types';
import dayjs from 'dayjs';

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
  statusToFilter: Status,
): JobType[] {
  return jobs.filter((job) => job.status === statusToFilter);
}

export function filterApplicationsByStatus(
  jobId: string,
  applications: any,
  statusToFilter?: string,
): JobApplcationDB[] {
  if (statusToFilter) {
    return applications.filter(
      (app) => app.status === statusToFilter && app.job_id === jobId,
    );
  } else {
    return applications.filter((app) => app.job_id === jobId);
  }
}

export const getBgColorJobsList = (
  status: DatabaseTable['public_jobs']['status'],
) => {
  if (status === 'draft') {
    return StatusColor.draft.bgColor;
  } else if (status === 'published') {
    return StatusColor.published.bgColor;
  } else if (status === 'closed') {
    return StatusColor.closed.bgColor;
  }
};

export const getTextColorJobsList = (
  status: DatabaseTable['public_jobs']['status'],
) => {
  if (status === 'draft') {
    return StatusColor.draft.textColor;
  } else if (status === 'published') {
    return StatusColor.published.textColor;
  } else if (status === 'closed') {
    return StatusColor.closed.textColor;
  }
};

export const StatusColor = Object.freeze({
  draft: {
    bgColor: 'var(--warning-3)',
    textColor: 'var(--warning-11)',
  },
  published: {
    bgColor: 'var(--success-3)',
    textColor: 'var(--success-11)',
  },
  closed: {
    bgColor: 'var(--error-3)',
    textColor: 'var(--error-11)',
  },
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
  if (search) {
    const filteredData = jobs.filter((item) => {
      const jobTitle = item.job_title.toLowerCase();
      return jobTitle.includes(search);
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
      closed: 3,
    };

    const orderA = statusOrder[a.status] || 0;
    const orderB = statusOrder[b.status] || 0;

    return orderA - orderB;
  });
}
