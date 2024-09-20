'use client';

import Interviews from '@interviews/components/MainBody';
import React from 'react';

import { SchedulingAnalyticsContextProvider } from '@/context/SchedulingAnalytics';

function InterviewsPage() {
  return (
    <SchedulingAnalyticsContextProvider>
      <Interviews />
    </SchedulingAnalyticsContextProvider>
  );
}

export default InterviewsPage;
