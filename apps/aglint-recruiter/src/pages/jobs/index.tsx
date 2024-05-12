import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Seo from '@/src/components/Common/Seo';
import DashboardComp from '@/src/components/JobsDashboard';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import IntegrationProvider from '@/src/context/IntegrationProvider/IntegrationProvider';
import { pageRoutes } from '@/src/utils/pageRouting';

const Dashboard = () => {
  const { recruiter } = useAuthDetails();
  const router = useRouter();
  useEffect(() => {
    if (recruiter?.id === process.env.NEXT_PUBLIC_DEFAULT_SUPPORT_COMPANY_ID)
      router.replace(pageRoutes.SUPPORT);
  }, [recruiter]);
  return (
    <>
      <Seo title={`Jobs`} description='AI for People Products' />
      <IntegrationProvider>
        <DashboardComp />
      </IntegrationProvider>
    </>
  );
};

export default Dashboard;
