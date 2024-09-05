'use client';
import '@styles/globals.css';
import 'regenerator-runtime/runtime';
import '@styles/globals.css';

import React, { useState } from 'react';

import DashboardDataFilter from '@/components/Dashboards/Interview/DashboardDataFilter';
import InterviewDashboardSideNav from '@/components/Dashboards/Interview/InterviewDashboardSideNav';
import AnalyticsProvider from '@/context/AnalyticsContext/AnalyticsContextProvider';
export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState('default_tab');
  return (
    <div className='flex'>
      <InterviewDashboardSideNav
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          const url = new URL(window.location.href);
          url.searchParams.set('tab', tab);
          window.history.pushState({}, '', url);
        }}
      />
      <div className='flex-grow flex flex-col'>
        <AnalyticsProvider>
          <div className='p-6'>
            <DashboardDataFilter />
          </div>
          {children}
        </AnalyticsProvider>
      </div>
    </div>
  );
}
