import SchedulingMainComp from '@/components/Scheduling';
import { SchedulingAnalyticsContextProvider } from '@/context/SchedulingAnalytics';

function SchedulingMainPage() {
  return <SchedulingMainComp />;
}

SchedulingMainPage.privateProvider = (page) => (
  <SchedulingAnalyticsContextProvider>
    {page}
  </SchedulingAnalyticsContextProvider>
);

export default SchedulingMainPage;
