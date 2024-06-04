import Seo from '@components/Common/Seo';

import JobEmailTemplatesDashboard from '@/src/components/JobEmailTemplates';
import { ApplicationProvider } from '@/src/context/ApplicationsContext';
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
        <ApplicationProvider>{page}</ApplicationProvider>
      </JobInterviewPlanProvider>
    </JobDashboardProvider>
  );
};

export default JobEmailTemplatesPage;
