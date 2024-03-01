import Seo from '@components/Common/Seo';

import Screening from '@/src/components/NewScreening/dashboard';


const ScreeningDashboardPage = () => {
  return (
    <>
      <Seo
        title='Aglint | Jobs'
        description='AI Powered Talent Development Platform.'
      />
      <Screening />
    </>
  );
};

export default ScreeningDashboardPage