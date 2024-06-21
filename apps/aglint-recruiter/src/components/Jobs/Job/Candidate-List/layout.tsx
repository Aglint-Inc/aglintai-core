import { useRouter } from 'next/router';
import React from 'react';

import { Breadcrum } from '@/devlink2/Breadcrum';
import { useApplications } from '@/src/context/ApplicationsContext';
import ROUTES from '@/src/utils/routing/routes';
import { capitalize } from '@/src/utils/text/textUtils';

export const BreadCrumbs = () => {
  const { push } = useRouter();
  const { job } = useApplications();
  return (
    <>
      <Breadcrum
        isLink
        textName={`${capitalize(job?.status ?? 'all')} jobs`}
        onClickLink={{
          onClick: () => {
            push(`${ROUTES['/jobs']()}?status=${job?.status ?? 'all'}`);
          },
          style: { cursor: 'pointer' },
        }}
      />
      <Breadcrum
        isLink
        textName={capitalize(job?.job_title ?? '---')}
        onClickLink={{
          onClick: () => {
            push(ROUTES['/jobs/[id]']({ id: job?.id }));
          },
          style: { cursor: 'pointer' },
        }}
        showArrow
      />
      <Breadcrum textName={`Candidate list`} showArrow />
    </>
  );
};
