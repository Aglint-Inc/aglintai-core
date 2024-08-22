import { useEffect } from 'react';

import { useApplication } from '@/src/context/ApplicationContext';
import { useBreadcrumContext } from '@/src/context/BreadcrumContext/BreadcrumContext';
import { useJobsRead } from '@/src/queries/jobs';
import ROUTES from '@/src/utils/routing/routes';

function BreadCrumb() {
  const { breadcrum, setBreadcrum } = useBreadcrumContext();
  const { data: allJobs } = useJobsRead();
  const {
    meta: { data: detail },
    job_id,
  } = useApplication();
  const job = allJobs?.find((job) => job.id === job_id);
  useEffect(() => {
    setBreadcrum([
      {
        name: 'Published Jobs',
        route: ROUTES['/jobs'](),
      },
      {
        name: job?.job_title,
        route: ROUTES['/jobs/[id]']({
          id: job_id,
        }),
      },
      {
        name: 'Application',
        route: ROUTES['/jobs/[id]/candidate-list']({
          id: job_id,
        }),
      },
      {
        name: detail?.name || 'Application Details',
      },
    ]);
  }, [detail?.name]);

  return <>{breadcrum}</>;
}

export default BreadCrumb;
