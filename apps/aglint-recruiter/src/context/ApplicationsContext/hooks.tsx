import { DatabaseTable } from '@aglint/shared-types';
import { useQuery } from '@tanstack/react-query';

import { applicationsQueries } from '@/src/queries/job-applications';

export const useApplicationsActions = ({
  job_id,
}: {
  job_id: DatabaseTable['public_jobs']['id'];
}) => {
  const applications = useQuery(applicationsQueries.applications({ job_id }));
  return applications;
};
