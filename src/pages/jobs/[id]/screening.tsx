import Seo from '@components/Common/Seo';

import ScreeningDashboardComp from '@/src/components/NewScreening/JobDashboard';
import JobApplicationProvider from '@/src/context/JobApplicationsContext';
import JobDashboardProvider from '@/src/context/JobDashboard';
import JobInterviewPlanProvider from '@/src/context/JobInterviewPlanContext';

const ScreeningPage = () => {
  return (
    <>
      <Seo title={`Jobs`} description='AI for People Products' />
      <ScreeningDashboardComp />
    </>
  );
};

export default ScreeningPage;

ScreeningPage.privateProvider = function privateProvider(page) {
  return (
    <JobDashboardProvider>
      <JobInterviewPlanProvider>
        <JobApplicationProvider> {page}</JobApplicationProvider>
      </JobInterviewPlanProvider>
    </JobDashboardProvider>
  );
};
