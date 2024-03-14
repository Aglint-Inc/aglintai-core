import Seo from '@components/Common/Seo';
import React from 'react';

import ScreeningDashboardComp from '@/src/components/NewScreening/JobDashboard';
import JobDashboardProvider from '@/src/context/JobDashboard';

const ScreeningPage = () => {
  return (
    <>
      <Seo
        title='Aglint | Jobs'
        description='AI Powered Talent Development Platform.'
      />
      <ScreeningDashboardComp />
    </>
  );
};

export default ScreeningPage;

ScreeningPage.getProvider = function getProvider(page) {
  return <JobDashboardProvider>{page}</JobDashboardProvider>;
};
