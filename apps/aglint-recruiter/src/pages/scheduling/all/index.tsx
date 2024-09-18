import React from 'react';

import { ScheduleStatesProvider } from '@/components/Scheduling/Interviews/_common/contexts/ScheduleStatesContext';
import AllInterviews from '@/components/Scheduling/Interviews/Components/AllInterviews';

function AllInterviewPage() {
  return (
    <ScheduleStatesProvider>
      <AllInterviews />
    </ScheduleStatesProvider>
  );
}

export default AllInterviewPage;
