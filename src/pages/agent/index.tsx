import { useRouter } from 'next/router';

import { WelcomeAssistant } from '@/devlink3';
import Seo from '@/src/components/Common/Seo';
import { JobAssistantProvider } from '@/src/context/JobAssistant';

function AgentPage() {
  const router = useRouter();
  return (
    <>
      <Seo
        title='Aglint | Agents'
        description='AI Powered Talent Development Platform.'
      />
      <JobAssistantProvider>
        <WelcomeAssistant
          onClickJobAssistant={{
            onClick: () => {
              router.push(`/agent/jobs`);
            },
          }}
          onClickScheduler={{
            onClick: () => {
              router.push(`/agent/scheduler`);
            },
          }}
        />
      </JobAssistantProvider>
    </>
  );
}

export default AgentPage;
