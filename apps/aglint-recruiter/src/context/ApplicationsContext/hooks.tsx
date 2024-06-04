import { DatabaseTable } from '@aglint/shared-types';
import { useInfiniteQuery } from '@tanstack/react-query';

import { applicationsQueries } from '@/src/queries/job-applications';

import { useJobDetails } from '../JobDashboard';

export const useApplicationsActions = ({
  job_id,
}: {
  job_id: DatabaseTable['public_jobs']['id'];
}) => {
  const { job } = useJobDetails();
  const newApplications = useInfiniteQuery(
    applicationsQueries.applications({
      job_id,
      status: 'new',
      count: job?.count?.new ?? 0,
    }),
  );
  const screeningApplications = useInfiniteQuery(
    applicationsQueries.applications({
      job_id,
      status: 'screening',
      count: job?.count?.screening ?? 0,
    }),
  );
  const assessmentApplications = useInfiniteQuery(
    applicationsQueries.applications({
      job_id,
      status: 'assessment',
      count: job?.count?.assessment ?? 0,
    }),
  );
  const interviewApplications = useInfiniteQuery(
    applicationsQueries.applications({
      job_id,
      status: 'interview',
      count: job?.count?.interview ?? 0,
    }),
  );
  const qualifiedApplications = useInfiniteQuery(
    applicationsQueries.applications({
      job_id,
      status: 'qualified',
      count: job?.count?.qualified ?? 0,
    }),
  );
  const disqualifiedApplications = useInfiniteQuery(
    applicationsQueries.applications({
      job_id,
      status: 'disqualified',
      count: job?.count?.disqualified ?? 0,
    }),
  );
  return {
    newApplications,
    screeningApplications,
    assessmentApplications,
    interviewApplications,
    qualifiedApplications,
    disqualifiedApplications,
  };
};
