import { type PropsWithChildren } from 'react';

import { SchedulingAnalyticsContextProvider } from '@/context/SchedulingAnalytics';

function InterviewsLayout({ children }: PropsWithChildren) {
  return (
    <SchedulingAnalyticsContextProvider>
      {children}
    </SchedulingAnalyticsContextProvider>
  );
}

export default InterviewsLayout;
