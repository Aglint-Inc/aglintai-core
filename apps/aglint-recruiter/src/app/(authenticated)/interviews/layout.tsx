'use client';
import { ScheduleStatesProvider } from '@interviews/contexts/ScheduleStatesContext';
import { type PropsWithChildren } from 'react';

function Layout({ children }: PropsWithChildren) {
  return <ScheduleStatesProvider>{children}</ScheduleStatesProvider>;
}

export default Layout;
