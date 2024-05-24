import Seo from '@components/Common/Seo';

import JobEmailTemplatesDashboard from '@/src/components/JobEmailTemplates';
import JobApplicationProvider from '@/src/context/JobApplicationsContext';
import JobDashboardProvider from '@/src/context/JobDashboard';
import JobInterviewPlanProvider from '@/src/context/JobInterviewPlanContext';

const JobEmailTemplatesPage = () => {
  return (
    <>
      <Seo
        title='Email Templates - Job | Aglint AI'
        description='AI for People Products'
      />
      <JobEmailTemplatesDashboard />
    </>
  );
};

JobEmailTemplatesPage.privateProvider = function privateProvider(page) {
  return (
    <JobDashboardProvider>
      <JobInterviewPlanProvider>
        <JobApplicationProvider>{page}</JobApplicationProvider>
      </JobInterviewPlanProvider>
    </JobDashboardProvider>
  );
};

export default JobEmailTemplatesPage;
