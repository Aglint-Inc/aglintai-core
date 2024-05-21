import Seo from '@components/Common/Seo';

import JobDetailsDashboard from '@/src/components/JobDetails';
import JobApplicationProvider from '@/src/context/JobApplicationsContext';
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
    <JobDashboardProvider>
      <JobInterviewPlanProvider>
        <JobApplicationProvider>{page}</JobApplicationProvider>
      </JobInterviewPlanProvider>
    </JobDashboardProvider>
  );
};

export default JobDetailsPage;
