import Agent from '@/src/components/Agent';
import Seo from '@/src/components/Common/Seo';
import { JobAssistantProvider } from '@/src/context/JobAssistant';
import { JobProvider } from '@/src/context/JobContext';
import JobDashboardProvider from '@/src/context/JobDashboard';

function AgentPage() {
  return (
    <>
      <Seo
        title='Job Assissant | Aglint AI'
        description='AI for People Products'
      />
      <JobAssistantProvider>
        <Agent />
      </JobAssistantProvider>
    </>
  );
}

export default AgentPage;

AgentPage.privateProvider = function privateProvider(page) {
  return (
    <JobProvider>
      <JobDashboardProvider>{page}</JobDashboardProvider>
    </JobProvider>
  );
};
