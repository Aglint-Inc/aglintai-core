'use client';
import { OneColumnPageLayout } from '@components/layouts/one-column-page-layout';
import { InterviewerHeaderProvider } from '@interviewers/components';
import { Header } from '@interviewers/components/Header';
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
