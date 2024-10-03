'use client';
import { InterviewerHeaderProvider } from '@interviewers/hooks/useInterviewerHeaderContext';
import { type PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  return <InterviewerHeaderProvider>{children}</InterviewerHeaderProvider>;
};

export default Layout;
