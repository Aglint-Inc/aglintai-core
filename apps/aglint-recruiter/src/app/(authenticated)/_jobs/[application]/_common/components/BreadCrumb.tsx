'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useApplication } from '@/context/ApplicationContext';
import { useJobsRead } from '@/queries/jobs';
import ROUTES from '@/utils/routing/routes';

function BreadCrumb() {
  const [breadcrumbItems, setBreadcrumbItems] = useState<
    Array<{ name: string; route?: string }>
  >([]);
  const { data: allJobs } = useJobsRead();
  const {
    meta: { data: detail },
    job_id,
  } = useApplication();
  const job = allJobs?.find((job) => job.id === job_id);

  useEffect(() => {
    setBreadcrumbItems([
      {
        name: 'Jobs',
        route: ROUTES['/jobs'](),
      },
      {
        name: job?.job_title || '',
        route: job ? ROUTES['/jobs/[job]']({ job: job_id }) : undefined,
      },
      {
        name: detail?.name || '',
      },
    ]);
  }, [detail?.name, job, job_id]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <BreadcrumbItem key={index}>
            {item.route ? (
              <BreadcrumbLink asChild>
                <Link href={item.route}>{item.name}</Link>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{item.name}</BreadcrumbPage>
            )}
            {index < breadcrumbItems.length - 1 && (
              <BreadcrumbSeparator>
                <ChevronRight className='h-4 w-4' />
              </BreadcrumbSeparator>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadCrumb;
