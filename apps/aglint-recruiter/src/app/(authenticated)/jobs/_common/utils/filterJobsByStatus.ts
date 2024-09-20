import type { JobType, Status } from '@/jobs/components/types';

export function filterJobsByStatus(
  jobs: JobType[],
  statusToFilter: Status,
): JobType[] {
  return jobs.filter((job) => job.status === statusToFilter);
}
