import DashboardComp from '@components/Dashboard';
import JobsProvider /*,{useJobs}*/ from '@context/JobsContext';

const Dashboard = () => {
  return (
    <>
      <DashboardComp />
    </>
  );
};

Dashboard.getProvider = function getProvider(page) {
  return <JobsProvider>{page}</JobsProvider>;
};

export default Dashboard;
