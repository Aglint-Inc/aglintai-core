import Seo from '@components/Common/Seo';

import ScreeningDashboardComp from '@/src/components/NewScreening/JobDashboard';
import { ApplicationProvider } from '@/src/context/ApplicationsContext';
import JobDashboardProvider from '@/src/context/JobDashboard';
import JobInterviewPlanProvider from '@/src/context/JobInterviewPlanContext';

const ScreeningPage = () => {
  return (
    <>
      <Seo
        title={`Screening - Job | Aglint AI`}
        description='AI for People Products'
      />
      <ScreeningDashboardComp />
    </>
  );
};

export default ScreeningPage;

ScreeningPage.privateProvider = function privateProvider(page) {
  return (
    <JobDashboardProvider>
      <JobInterviewPlanProvider>
        <ApplicationProvider>{page}</ApplicationProvider>
      </JobInterviewPlanProvider>
    </JobDashboardProvider>
  );
};
