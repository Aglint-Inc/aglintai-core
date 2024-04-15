import Seo from '@components/Common/Seo';
import React from 'react';

import ScreeningDashboardComp from '@/src/components/NewScreening/JobDashboard';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import JobDashboardProvider from '@/src/context/JobDashboard';

const ScreeningPage = () => {
  const { recruiter } = useAuthDetails();
  return (
    <>
      <Seo
        title={`${recruiter.name} | Jobs`}
        description='AI for People Products'
      />
      <ScreeningDashboardComp />
    </>
  );
};

export default ScreeningPage;

ScreeningPage.getProvider = function getProvider(page) {
  return <JobDashboardProvider>{page}</JobDashboardProvider>;
};
