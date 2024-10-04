import type { JobApplcationDB } from '@aglint/shared-types';

export function filterApplicationsByStatus(
  jobId: string,
  applications: any,
  statusToFilter?: string,
): JobApplcationDB[] {
  if (statusToFilter) {
    return applications.filter(
      (app: any) => app.status === statusToFilter && app.job_id === jobId,
    );
  } else {
    return applications.filter((app: any) => app.job_id === jobId);
  }
}
