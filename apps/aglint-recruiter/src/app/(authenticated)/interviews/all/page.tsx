'use client';
import { FullWidthLayout } from '@components/layouts/full-width-layout';
import { PageHeader } from '@components/layouts/page-header';
import AllInterviews from '@interviews/components/AllInterviews';
import AllInterviewFilters from '@interviews/components/Filters/AllInterviewFilters';
import { ScheduleStatesProvider } from '@interviews/contexts/ScheduleStatesContext';
import React from 'react';

function AllInterviewsPage() {
  return (
    <FullWidthLayout
      header={
        <>
          <PageHeader
            title='All Interviews'
            description='View and manage all scheduled interviews for your recruitment process.'
          />
        </>
      }
      filter={<AllInterviewFilters />}
    >
      <ScheduleStatesProvider>
        <AllInterviews />
      </ScheduleStatesProvider>
    </FullWidthLayout>
  );
}

export default AllInterviewsPage;
