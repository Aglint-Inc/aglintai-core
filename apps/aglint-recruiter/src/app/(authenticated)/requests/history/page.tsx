'use client';

import { OneColumnPageLayout } from '@components/layouts/one-column-page-layout';
import {
  PageDescription,
  PageHeader,
  PageTitle,
} from '@components/layouts/page-header';
import CompletedRequests from '@requestHistory/components/CompletedRequests';
import React from 'react';

function RequestHistoryPage() {
  return (
    <OneColumnPageLayout
      header={
        <PageHeader>
          <PageTitle>Request History</PageTitle>
          <PageDescription>View your completed requests.</PageDescription>
        </PageHeader>
      }
    >
      <CompletedRequests />
    </OneColumnPageLayout>
  );
}

export default RequestHistoryPage;
