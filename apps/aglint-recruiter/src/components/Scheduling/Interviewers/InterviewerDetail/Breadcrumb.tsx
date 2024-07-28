import React, { useEffect } from 'react';

import { useBreadcrumContext } from '@/src/context/BreadcrumContext/BreadcrumContext';
import ROUTES from '@/src/utils/routing/routes';

import { useImrQuery } from './hooks';

function Breadcrumb({
    interviewerDetails
}:{
    interviewerDetails:ReturnType<typeof useImrQuery>["data"]
}) {
  const { breadcrum, setBreadcrum } = useBreadcrumContext();

  useEffect(() => {
    if (interviewerDetails?.user_id) {
      setBreadcrum([
        {
          name: 'Scheduling',
          route: ROUTES['/scheduling']() + `?tab=dashboard`,
        },
        {
          name: 'Interviewers',
          route: ROUTES['/scheduling']() + `?tab=interviewers`,
        },
        {
          name: `${interviewerDetails.first_name || ''} ${interviewerDetails.last_name || ''}`.trim(),
        },
      ]);
    }
  }, [interviewerDetails?.user_id]);


  return <>{breadcrum}</>;
}

export default Breadcrumb;
