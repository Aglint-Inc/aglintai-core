import Agent from '@/src/components/Agent';
import Seo from '@/src/components/Common/Seo';

function AgentPage() {
  return (
    <>
      <Seo
        title='Aglint | Agents'
        description='AI Powered Talent Development Platform.'
      />
      <Agent />
    </>
  );
}

export default AgentPage;
