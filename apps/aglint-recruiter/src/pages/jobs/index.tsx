import Seo from '@/src/components/Common/Seo';
import DashboardComp from '@/src/components/Jobs/Dashboard';
import IntegrationProvider from '@/src/context/IntegrationProvider/IntegrationProvider';

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
