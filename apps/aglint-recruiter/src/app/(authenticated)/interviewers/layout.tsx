'use client';
import { OneColumnPageLayout } from '@components/layouts/one-column-page-layout';
import { Header } from '@interviewers/components/Header';
import { InterviewerHeaderProvider } from '@interviewers/hooks/useInterviewerHeaderContext';
import { type PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <InterviewerHeaderProvider>
      <OneColumnPageLayout header={<Header />} sidebarPosition='none'>
        {children}
      </OneColumnPageLayout>
    </InterviewerHeaderProvider>
  );
};

export default Layout;
