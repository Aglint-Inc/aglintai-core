'use client';
import { OneColumnPageLayout } from '@components/layouts/one-column-page-layout';
import {
  PageDescription,
  PageHeader,
  PageHeaderText,
  PageTitle,
} from '@components/layouts/page-header';
import AllInterviews from '@interviews/components/AllInterviews';
import AllInterviewFilters from '@interviews/components/Filters/AllInterviewFilters';
import { ScheduleStatesProvider } from '@interviews/contexts/ScheduleStatesContext';
import React from 'react';

function AllInterviewsPage() {
  return (
    <OneColumnPageLayout
      header={
        <PageHeader>
          <PageHeaderText>
            <PageTitle>All Interviews</PageTitle>
            <PageDescription>
              View and manage all scheduled interviews for your recruitment
              process.
            </PageDescription>
          </PageHeaderText>
        </PageHeader>
      }
      filter={<AllInterviewFilters />}
    >
      <ScheduleStatesProvider>
        <AllInterviews />
      </ScheduleStatesProvider>
    </OneColumnPageLayout>
  );
}

export default AllInterviewsPage;
