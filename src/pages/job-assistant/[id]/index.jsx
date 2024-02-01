import JobAssistant from '@/src/components/JobsDashboard/JobAssistant';
import { JobAssistantProvider } from '@/src/context/JobAssistant';

function JobAssistantPage() {
  return (
    <JobAssistantProvider>
      <JobAssistant />
    </JobAssistantProvider>
  );
}

export default JobAssistantPage;