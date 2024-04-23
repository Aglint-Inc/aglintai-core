import Seo from '@components/Common/Seo';

import JobApplicationsDashboard from '@/src/components/JobApplicationsDashboard';
import JobPostFormProvider from '@/src/components/JobsDashboard/JobPostCreateUpdate/JobPostFormProvider';
import JobApplicationProvider from '@/src/context/JobApplicationsContext';
import JobDashboardProvider from '@/src/context/JobDashboard';
import JobInterviewPlanProvider from '@/src/context/JobInterviewPlanContext';

const JobPage = () => {
  return (
    <>
      <Seo title='Jobs' description='AI Powered Talent Development Platform.' />
      <JobPostFormProvider>
        <JobApplicationsDashboard />
      </JobPostFormProvider>
    </>
  );
};

JobPage.privateProvider = function privateProvider(page) {
  return (
    <JobDashboardProvider>
      <JobApplicationProvider>
        <JobInterviewPlanProvider>{page}</JobInterviewPlanProvider>
      </JobApplicationProvider>
    </JobDashboardProvider>
  );
};

export default JobPage;
