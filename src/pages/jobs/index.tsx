import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Seo from '@/src/components/Common/Seo';
import DashboardComp from '@/src/components/JobsDashboard';
import JobPostFormProvider from '@/src/components/JobsDashboard/JobPostCreateUpdate/JobPostFormProvider';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import IntegrationProvider from '@/src/context/IntegrationProvider/IntegrationProvider';
import withRoleProtection from '@/src/HOC/RoleProtection';
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
      <Seo
        title={`${recruiter.name} | Jobs`}
        description='AI Powered Talent Development Platform.'
      />
      <IntegrationProvider>
        <JobPostFormProvider>
          <DashboardComp />
        </JobPostFormProvider>
      </IntegrationProvider>
    </>
  );
};

export default withRoleProtection(Dashboard, [
  'admin',
  'recruiter',
  'scheduler',
]);
