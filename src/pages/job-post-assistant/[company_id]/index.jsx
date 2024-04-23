import ChatMessages from '@/src/components/AssistantChat';
import { JobPostAssistantProvider } from '@/src/context/JobPostAssistant';

function JobAssistant() {
  return (
    <JobPostAssistantProvider>
      <ChatMessages />
    </JobPostAssistantProvider>
  );
}

export default JobAssistant;

JobAssistant.publicProvider = (page) => page;
