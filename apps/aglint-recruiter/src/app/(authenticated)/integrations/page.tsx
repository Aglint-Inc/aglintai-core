'use client';
import { OneColumnPageLayout } from '@components/layouts/one-column-page-layout';

import { Integrations, IntegrationsHeader } from '@/components/Integrations';

function IntegrationsPage() {
  return (
    <>
      <OneColumnPageLayout header={<IntegrationsHeader />}>
        <Integrations />
      </OneColumnPageLayout>
    </>
  );
}

export default IntegrationsPage;
