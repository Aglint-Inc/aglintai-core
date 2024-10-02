'use client';

import { OneColumnPageLayout } from '@components/layouts/one-column-page-layout';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderTitle,
} from '@components/layouts/page-header';
import CompletedRequests from '@requestHistory/components/CompletedRequests';
import React from 'react';

function RequestHistoryPage() {
  return (
    <OneColumnPageLayout
      header={
        <PageHeader>
          <PageHeaderTitle>Request History</PageHeaderTitle>
          <PageHeaderDescription>
            View your completed requests.
          </PageHeaderDescription>
        </PageHeader>
      }
    >
      <CompletedRequests />
    </OneColumnPageLayout>
  );
}

export default RequestHistoryPage;
