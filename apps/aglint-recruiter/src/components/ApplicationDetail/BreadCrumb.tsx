import { useEffect } from 'react';

import { useApplication } from '@/context/ApplicationContext';
import { useBreadcrumContext } from '@/context/BreadcrumContext/BreadcrumContext';
import { useJobsRead } from '@/queries/jobs';
import ROUTES from '@/utils/routing/routes';

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
        name: 'Jobs',
        route: ROUTES['/jobs'](),
      },
      {
        name: job?.job_title,
        route: ROUTES['/jobs/[job]']({
          job: job_id,
        }),
      },
      {
        name: detail?.name || '',
      },
    ]);
  }, [detail?.name]);

  return <>{breadcrum}</>;
}

export default BreadCrumb;
