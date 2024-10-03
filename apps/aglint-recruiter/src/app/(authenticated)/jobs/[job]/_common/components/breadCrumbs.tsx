import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import React from 'react';

import { useRouterPro } from '@/hooks/useRouterPro';
import { useJob } from '@/job/hooks';
import ROUTES from '@/utils/routing/routes';
import { capitalizeSentence } from '@/utils/text/textUtils';

export const BreadCrumbs = () => {
  const { push } = useRouterPro();
  const { job } = useJob();
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='#' onClick={() => push(ROUTES['/jobs']())}>
              Jobs
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href='#'
              onClick={() =>
                push(ROUTES['/jobs/[job]']({ job: (job?.id ?? null)! }))
              }
            >
              {capitalizeSentence(job?.job_title ?? '---')}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Applications</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};
