'use client';
import { OneColumnPageLayout } from '@components/layouts/one-column-page-layout';

import { Integrations, IntegrationsHeader } from './_common/components';

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
