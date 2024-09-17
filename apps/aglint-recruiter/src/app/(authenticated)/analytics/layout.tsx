'use client';
import '@styles/globals.css';
import 'regenerator-runtime/runtime';
import '@styles/globals.css';

import React, { useState } from 'react';

import DashboardDataFilter from '@/components/Dashboards/Interview/DashboardDataFilter';
import InterviewDashboardSideNav from '@/components/Dashboards/Interview/InterviewDashboardSideNav';

import AnalyticsProvider from './_common/context/AnalyticsContext/AnalyticsContextProvider';

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState('default_tab');
  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='container mx-auto p-6'>
        <div className='mb-6 flex items-center justify-between'>
          <div>
            <h1 className='mb-2 text-3xl font-bold'>Analytics</h1>
            {/* Add BreadCrumb here */}
          </div>
        </div>
        <div className='flex flex-row'>
          <div className='flex w-2/12 flex-col'>
            <h2 className='text-mg mb-2 font-semibold'>Analytics</h2>
            <p className='mb-4 text-sm text-gray-600'>
              All the analytics can be found here.
            </p>
            <InterviewDashboardSideNav
              activeTab={activeTab}
              setActiveTab={(tab) => {
                setActiveTab(tab);
                const url = new URL(window.location.href);
                url.searchParams.set('tab', tab);
                window.history.pushState({}, '', url);
              }}
              className='mr-6'
            />
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
