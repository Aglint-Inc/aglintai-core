'use client';

import { type PropsWithChildren } from 'react';

import { JobProvider } from '@/job/contexts';
import { JobInterviewPlanProvider } from '@/job/interview-plan/contexts';
const Layout = ({ children }: PropsWithChildren) => {
  return (
    <JobProvider>
      <JobInterviewPlanProvider>{children}</JobInterviewPlanProvider>
    </JobProvider>
  );
};

export default Layout;
