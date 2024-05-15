import Seo from '@components/Common/Seo';

import Screening from '@/src/components/NewScreening/ScreeningDashboard';


const ScreeningDashboardPage = () => {
  return (
    <>
      <Seo
        title='Screening | Jobs'
        description='AI for People Products'
      />
      <Screening />
    </>
  );
};

export default ScreeningDashboardPage