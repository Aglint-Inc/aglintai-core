import { useRouter } from 'next/router';
import React from 'react';

import { Breadcrum } from '@/devlink2/Breadcrum';
import { useApplications } from '@/src/context/ApplicationsContext';
import ROUTES from '@/src/utils/routing/routes';
import { capitalizeSentence } from '@/src/utils/text/textUtils';

export const BreadCrumbs = () => {
  const { push } = useRouter();
  const { job } = useApplications();
  return (
    <>
      <Breadcrum
        isLink
        textName={`Jobs`}
        onClickLink={{
          onClick: () => {
            push(ROUTES['/jobs']());
          },
          style: { cursor: 'pointer' },
        }}
      />
      <Breadcrum
        isLink
        textName={capitalizeSentence(job?.job_title ?? '---')}
        onClickLink={{
          onClick: () => {
            push(ROUTES['/jobs/[id]']({ id: job?.id }));
          },
          style: { cursor: 'pointer' },
        }}
        showArrow
      />
      <Breadcrum textName={`Applications`} showArrow />
    </>
  );
};
