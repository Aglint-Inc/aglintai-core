'use client';
import '@styles/globals.css';
import 'regenerator-runtime/runtime';
import '@styles/globals.css';

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
    <div className='container-lg mx-auto w-full px-12'>
      <div className='mb-4'>
        <div className='mb-6 flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-semibold'>Reports</h1>
            {/* Add BreadCrumb here */}
          </div>
        </div>
        <div className='flex flex-row'>
          <div className='flex w-2/12 flex-col'>
            <h2 className='text-lg font-semibold'>Reports</h2>
            <p className='mb-4 text-sm text-gray-600'>
              All the Reports can be found here.
            </p>
            <InterviewDashboardSideNav />
          </div>
          <div className='flex w-10/12 flex-grow flex-col pl-8'>
            <AnalyticsProvider>
              <div className='mb-6'>
                <DashboardDataFilter />
              </div>
              {children}
            </AnalyticsProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
