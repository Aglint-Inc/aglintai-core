import type { Job } from '@/jobs/types';

export function sortJobs(jobs: Job[]) {
  return jobs.sort((a, b) => {
    const statusOrder = {
      published: 1,
      draft: 2,
      closed: 3,
    };

    const orderA = statusOrder[a.status!] || 0;
    const orderB = statusOrder[b.status!] || 0;

    return orderA - orderB;
  });
}
