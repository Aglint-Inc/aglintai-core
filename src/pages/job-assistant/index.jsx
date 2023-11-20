import ChatMessages from '@/src/components/AssistantChat';
import { JobAssistantProvider } from '@/src/context/JobAssistant';

function JobAssistant() {
  return (
    <JobAssistantProvider>
      <ChatMessages />
    </JobAssistantProvider>
  );
}

export default JobAssistant;

JobAssistant.getLayout = (page) => page;
