import DashboardComp from '@components/Dashboard';
import JobsProvider from '@context/JobsContext';
import React from 'react';

const Dashboard = () => {
  return (
    <>
      <DashboardComp />
    </>
  );
};

Dashboard.getProvider = function getProvider(page) {
  return <JobsProvider>{page}</JobsProvider>;
};

export default Dashboard;
