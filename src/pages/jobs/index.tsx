import Seo from '@components/Common/Seo';
import DashboardComp from '@components/Dashboard';
import JobsProvider /*,{useJobs}*/ from '@context/JobsContext';

const Dashboard = () => {
  return (
    <>
      <Seo
        title='Aglint | Jobs'
        description='AI Powered Talent Development Platform.'
      />
      <DashboardComp />
    </>
  );
};

Dashboard.getProvider = function getProvider(page) {
  return <JobsProvider>{page}</JobsProvider>;
};

export default Dashboard;
