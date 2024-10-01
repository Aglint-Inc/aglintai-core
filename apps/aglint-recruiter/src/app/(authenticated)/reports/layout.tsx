'use client';
import { FullWidthLayout } from '@components/layouts/full-width-layout';
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
      <FullWidthLayout
        sidebar={
          <>
            <h2 className='text-lg font-semibold'>Reports</h2>
            <p className='mb-4 text-sm text-gray-600'>
              All the Reports can be found here.
            </p>
            <InterviewDashboardSideNav />
          </>
        }
        filter={<DashboardDataFilter />}
        sidebarPosition='left'
        sidebarWidth={320}
      >
        {children}
      </FullWidthLayout>
    </AnalyticsProvider>
  );
}
