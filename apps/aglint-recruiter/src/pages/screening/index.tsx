import Seo from '@components/Common/Seo';

import Screening from '@/src/components/NewScreening/ScreeningDashboard';
import { WithScreening } from '@/src/components/withScreening';

const ScreeningDashboardPage = () => {
  return (
    <>
      <Seo title='Screening | Aglint AI' description='AI for People Products' />
      <WithScreening>
        <Screening />
      </WithScreening>
    </>
  );
};

export default ScreeningDashboardPage;
