import Seo from '@components/Common/Seo';

import JobEmailTemplatesDashboard from '@/src/components/JobEmailTemplates';
import JobApplicationProvider from '@/src/context/JobApplicationsContext';
import JobDashboardProvider from '@/src/context/JobDashboard';

const JobEmailTemplatesPage = () => {
  return (
    <>
      <Seo title='Jobs' description='AI Powered Talent Development Platform.' />
      <JobEmailTemplatesDashboard />
    </>
  );
};

JobEmailTemplatesPage.privateProvider = function privateProvider(page) {
  return (
    <JobDashboardProvider>
      <JobApplicationProvider>{page}</JobApplicationProvider>
    </JobDashboardProvider>
  );
};

export default JobEmailTemplatesPage;
