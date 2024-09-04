import Seo from '@/components/Common/Seo';
import DashboardComp from '@/components/Jobs/Dashboard';
import IntegrationProvider from '@/context/IntegrationProvider/IntegrationProvider';

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
