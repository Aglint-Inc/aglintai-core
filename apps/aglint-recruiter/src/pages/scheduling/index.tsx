import SchedulingMainComp from '@/src/components/Scheduling';
import { SchedulingAnalyticsContextProvider } from '@/src/context/SchedulingAnalytics';

function SchedulingMainPage() {
  return (
    <>
      <SchedulingMainComp />
    </>
  );
}

SchedulingMainPage.privateProvider = (page) => (
  <SchedulingAnalyticsContextProvider>
    {page}
  </SchedulingAnalyticsContextProvider>
);

export default SchedulingMainPage;
