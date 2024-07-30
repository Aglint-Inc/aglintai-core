import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { useBreadcrumContext } from '@/src/context/BreadcrumContext/BreadcrumContext';
import ROUTES from '@/src/utils/routing/routes';

import { useImrQuery } from './hooks';

function Breadcrumb({
  interviewerDetails,
}: {
  interviewerDetails: ReturnType<typeof useImrQuery>['data'];
}) {
  const { breadcrum, setBreadcrum } = useBreadcrumContext();
  const router = useRouter();

  useEffect(() => {
    if (interviewerDetails?.user_id) {
      if (router.query.profile) {
        setBreadcrum([
          {
            name: 'Profile',
            route:
              ROUTES['/user/profile/[user_id]']({
                user_id: interviewerDetails.user_id,
              }) + '?profile=true',
          },
          {
            name: `${interviewerDetails.first_name || ''} ${interviewerDetails.last_name || ''}`.trim(),
          },
        ]);
      } else if (router.query.company) {
        setBreadcrum([
          {
            name: 'Company',
            route: ROUTES['/company']() + `?tab=team`,
          },
          {
            name: 'Users',
            route: ROUTES['/company']() + `?tab=team`,
          },
          {
            name: `${interviewerDetails.first_name || ''} ${interviewerDetails.last_name || ''}`.trim(),
          },
        ]);
      } else {
        setBreadcrum([
          {
            name: 'Interviewers',
            route: ROUTES['/scheduling/interviewer'](),
          },
          {
            name: `${interviewerDetails.first_name || ''} ${interviewerDetails.last_name || ''}`.trim(),
          },
        ]);
      }
    }
  }, [interviewerDetails?.user_id]);

  return <>{breadcrum}</>;
}

export default Breadcrumb;
