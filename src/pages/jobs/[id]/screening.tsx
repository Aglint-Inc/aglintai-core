import Seo from '@components/Common/Seo';

import ScreeningDashboardComp from '@/src/components/NewScreening/JobDashboard';
import JobDashboardProvider from '@/src/context/JobDashboard';

const ScreeningPage = () => {
  return (
    <>
      <Seo title={`Jobs`} description='AI for People Products' />
      <ScreeningDashboardComp />
    </>
  );
};

export default ScreeningPage;

ScreeningPage.privateProvider = function privateProvider(page) {
  return <JobDashboardProvider>{page}</JobDashboardProvider>;
};
