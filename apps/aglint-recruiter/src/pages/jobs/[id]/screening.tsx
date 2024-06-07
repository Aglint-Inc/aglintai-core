import Seo from '@components/Common/Seo';

import ScreeningDashboardComp from '@/src/components/NewScreening/JobDashboard';
import { ApplicationsProvider } from '@/src/context/ApplicationsContext';
import { JobProvider } from '@/src/context/JobContext';
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
    <JobProvider>
      <JobDashboardProvider>
        <JobInterviewPlanProvider>
          <ApplicationsProvider>{page}</ApplicationsProvider>
        </JobInterviewPlanProvider>
      </JobDashboardProvider>
    </JobProvider>
  );
};
