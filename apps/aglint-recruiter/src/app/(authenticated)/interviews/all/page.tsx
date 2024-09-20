'use client';
import AllInterviews from '@interviews/components/AllInterviews';
import { ScheduleStatesProvider } from '@interviews/contexts/ScheduleStatesContext';
import React from 'react';

function AllInterviewsPage() {
  return (
    <ScheduleStatesProvider>
      <AllInterviews />
    </ScheduleStatesProvider>
  );
}

export default AllInterviewsPage;
