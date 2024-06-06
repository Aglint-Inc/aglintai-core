import Seo from '@components/Common/Seo';

import JobEmailTemplatesDashboard from '@/src/components/JobEmailTemplates';
import { ApplicationProvider } from '@/src/context/ApplicationsContext';
import { JobProvider } from '@/src/context/JobContext';
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
    <JobProvider>
      <JobDashboardProvider>
        <JobInterviewPlanProvider>
          <ApplicationProvider>{page}</ApplicationProvider>
        </JobInterviewPlanProvider>
      </JobDashboardProvider>
    </JobProvider>
  );
};

export default JobEmailTemplatesPage;
