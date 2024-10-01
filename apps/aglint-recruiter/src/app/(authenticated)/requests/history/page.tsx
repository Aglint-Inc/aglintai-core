'use client';

import { FullWidthLayout } from '@components/layouts/full-width-layout';
import { PageHeader } from '@components/layouts/page-header';
import CompletedRequests from '@requestHistory/components/CompletedRequests';
import React from 'react';

function RequestHistoryPage() {
  return (
    <FullWidthLayout
      header={
        <PageHeader
          title='Request History'
          description='View your completed requests.'
        />
      }
    >
      <CompletedRequests />
    </FullWidthLayout>
  );
}

export default RequestHistoryPage;
