import { ScheduleStatesProvider } from '@interviews/contexts/ScheduleStatesContext';
import React, { type PropsWithChildren } from 'react';

function AllInterviewsLayout({ children }: PropsWithChildren) {
  return <ScheduleStatesProvider>{children}</ScheduleStatesProvider>;
}

export default AllInterviewsLayout;
