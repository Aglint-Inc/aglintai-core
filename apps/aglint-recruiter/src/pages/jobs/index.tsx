import Seo from '@/components/Common/Seo';
import IntegrationProvider from '@/context/IntegrationProvider/IntegrationProvider';
import DashboardComp from '@/jobs/components';

const Dashboard = () => {
  return (
    <>
      <Seo
        title={`Job Listings - Job | Aglint AI`}
        description='AI for People Products'
      />
      <IntegrationProvider>
        <DashboardComp />
      </IntegrationProvider>
    </>
  );
};

export default Dashboard;
