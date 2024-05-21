import { useRouter } from 'next/router';
import { useFeatureFlagEnabled } from 'posthog-js/react';

import { WelcomeAssistant } from '@/devlink3/WelcomeAssistant';
import Seo from '@/src/components/Common/Seo';
import { JobAssistantProvider } from '@/src/context/JobAssistant';

function AgentPage() {
  const router = useRouter();
  const isSourcingEnabled = useFeatureFlagEnabled('isSourcingEnabled');
  return (
    <>
      <Seo title='Agent | Aglint AI' description='AI for People Products' />
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
          onClickSourcing={{
            style: { display: isSourcingEnabled ? 'flex' : 'none' },
            onClick: () => {
              router.push(`/agent/sourcing`);
            },
          }}
        />
      </JobAssistantProvider>
    </>
  );
}

export default AgentPage;
