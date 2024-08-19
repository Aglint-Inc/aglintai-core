import { Analytics } from '@/src/components/Scheduling/Analytics';
import { SchedulingAnalyticsContextProvider } from '@/src/context/SchedulingAnalytics';

const AnalyticsPage = () => {
  return <Analytics />;
};

AnalyticsPage.privateProvider = (page) => (
  <SchedulingAnalyticsContextProvider>
    {page}
  </SchedulingAnalyticsContextProvider>
);

export default AnalyticsPage;
