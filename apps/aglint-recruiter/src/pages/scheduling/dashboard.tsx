import React from 'react';

import SchedulingDashboard from '@/components/Scheduling/Dashboard';
import { SchedulingAnalyticsContextProvider } from '@/context/SchedulingAnalytics';

function DashboardSchedulingPage() {
  return <SchedulingDashboard />;
}

DashboardSchedulingPage.privateProvider = (page) => (
  <SchedulingAnalyticsContextProvider>
    {page}
  </SchedulingAnalyticsContextProvider>
);

export default DashboardSchedulingPage;
