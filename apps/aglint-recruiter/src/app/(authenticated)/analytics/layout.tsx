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
        <div className='flex justify-between items-center mb-6'>
          <div>
            <h1 className='text-3xl font-bold mb-2'>Analytics</h1>
            {/* Add BreadCrumb here */}
          </div>
        </div>
        <div className='flex flex-row'>
          <div className='flex flex-col w-2/12'>
            <h2 className='text-mg font-semibold mb-2'>Analytics</h2>
            <p className='text-sm text-gray-600 mb-4'>
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
          <div className='flex-grow flex flex-col w-10/12  pl-8'>
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
