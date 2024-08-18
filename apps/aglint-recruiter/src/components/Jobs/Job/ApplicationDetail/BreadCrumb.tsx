import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { useBreadcrumContext } from '@/src/context/BreadcrumContext/BreadcrumContext';
import { applicationQuery } from '@/src/queries/application';
import { useJobsRead } from '@/src/queries/jobs';
import ROUTES from '@/src/utils/routing/routes';

function BreadCrumb({
  application_id,
  job_id,
}: {
  application_id: string;
  job_id: string;
}) {
  const router = useRouter();
  const { breadcrum, setBreadcrum } = useBreadcrumContext();
  const { data: allJobs } = useJobsRead();
  const job = allJobs?.find((job) => job.id === job_id);
  const { data: detail } = useQuery(
    applicationQuery.meta({
      application_id,
      job_id,
    }),
  );
  const tab = router.query.tab;

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
        name: detail?.name,
      },
    ]);
  }, [tab]);

  return <>{breadcrum}</>;
}

export default BreadCrumb;
