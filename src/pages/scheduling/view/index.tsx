import React from 'react';

import Seo from '@/src/components/Common/Seo';
import SchedulingViewComp from '@/src/components/Scheduling/SchedulingView';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

function SchedulingViewPage() {
  const { recruiter } = useAuthDetails();
  return (
    <>
      <Seo
        title={`${recruiter.name} | Scheduling`}
        description='AI Powered Talent Development Platform.'
      />
      <SchedulingViewComp />
    </>
  );
}

export default SchedulingViewPage;
