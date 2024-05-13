import Agent from '@/src/components/Agent';
import Seo from '@/src/components/Common/Seo';
import JobPostFormProvider from '@/src/components/JobsDashboard/JobPostCreateUpdate/JobPostFormProvider';
import JobApplicationProvider from '@/src/context/JobApplicationsContext';
import { JobAssistantProvider } from '@/src/context/JobAssistant';
import JobDashboardProvider from '@/src/context/JobDashboard';

function AgentPage() {
  return (
    <>
      <Seo
        title='Aglint | Agents'
        description='AI for People Products'
      />
      <JobPostFormProvider>
        <JobAssistantProvider>
          <Agent />
        </JobAssistantProvider>
      </JobPostFormProvider>
    </>
  );
}

export default AgentPage;

AgentPage.privateProvider = function privateProvider(page) {
  return (
    <JobDashboardProvider>
      <JobApplicationProvider>{page}</JobApplicationProvider>
    </JobDashboardProvider>
  );
};
