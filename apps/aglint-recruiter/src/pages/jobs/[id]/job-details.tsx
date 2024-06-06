import Seo from '@components/Common/Seo';

import JobDetailsDashboard from '@/src/components/JobDetails';
import { ApplicationProvider } from '@/src/context/ApplicationsContext';
import { JobProvider } from '@/src/context/JobContext';
import JobDashboardProvider from '@/src/context/JobDashboard';
import JobInterviewPlanProvider from '@/src/context/JobInterviewPlanContext';

const JobDetailsPage = () => {
  return (
    <>
      <Seo
        title={`Jobs Details - Job | Aglint AI`}
        description='AI for People Products'
      />
      <JobDetailsDashboard />
    </>
  );
};

JobDetailsPage.privateProvider = (page) => {
  return (
    <JobProvider>
      <JobDashboardProvider>
        <JobInterviewPlanProvider>
          <ApplicationProvider>{page}</ApplicationProvider>
        </JobInterviewPlanProvider>
      </JobDashboardProvider>
    </JobProvider>
  );
};

export default JobDetailsPage;
