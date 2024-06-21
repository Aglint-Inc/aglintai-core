import Seo from '@components/Common/Seo';

import ScreeningDashboardComp from '@/src/components/Jobs/Job/Screening';
import { JobProvider } from '@/src/context/JobContext';

const ScreeningPage = () => {
  return (
    <>
      <Seo
        title={`Screening - Job | Aglint AI`}
        description='AI for People Products'
      />
      <ScreeningDashboardComp />
    </>
  );
};

export default ScreeningPage;

ScreeningPage.privateProvider = function privateProvider(page) {
  return <JobProvider>{page}</JobProvider>;
};
