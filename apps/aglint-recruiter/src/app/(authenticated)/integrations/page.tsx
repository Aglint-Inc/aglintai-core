'use client';
import Seo from '@/components/Common/Seo';
import Integrations from '@/components/Integrations';

function IntegrationsPage() {
  return (
    <>
      <Seo
        title={`Integrations | Aglint AI`}
        description='AI for People Products'
      />
      <Integrations />
    </>
  );
}

export default IntegrationsPage;
