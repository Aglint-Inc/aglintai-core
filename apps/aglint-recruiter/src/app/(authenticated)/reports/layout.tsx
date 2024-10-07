'use client';
import { OneColumnPageLayout } from '@components/layouts/one-column-page-layout';
import {
  SectionDescription,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import React from 'react';

import DashboardDataFilter from './_common/components/DashboardDataFilter';
import InterviewDashboardSideNav from './_common/components/InterviewDashboardSideNav';
import AnalyticsProvider from './_common/context/AnalyticsContext/AnalyticsContextProvider';

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AnalyticsProvider>
      <OneColumnPageLayout
        sidebar={
          <>
            <SectionHeaderText>
              <SectionTitle>Reports</SectionTitle>
              <SectionDescription>
                All the Reports can be found here.
              </SectionDescription>
            </SectionHeaderText>
            <InterviewDashboardSideNav />
          </>
        }
        filter={<DashboardDataFilter />}
        sidebarPosition='left'
        sidebarWidth={320}
      >
        {children}
      </OneColumnPageLayout>
    </AnalyticsProvider>
  );
}
