'use client';
import { FullWidthLayout } from '@components/layouts/full-width-layout';

import { Integrations, IntegrationsHeader } from '@/components/Integrations';

function IntegrationsPage() {
  return (
    <>
      <FullWidthLayout header={<IntegrationsHeader />}>
        <Integrations />
      </FullWidthLayout>
    </>
  );
}

export default IntegrationsPage;
