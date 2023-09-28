import Seo from '@/src/components/Common/Seo';
import DashboardComp from '@/src/components/JobsDashboard';
import JobPostFormProvider from '@/src/components/JobsDashboard/CreateNewJob/JobPostFormProvider';

const Dashboard = () => {
  return (
    <>
      <Seo
        title='Aglint | Jobs'
        description='AI Powered Talent Development Platform.'
      />
      <JobPostFormProvider>
        <DashboardComp />
      </JobPostFormProvider>
    </>
  );
};

export default Dashboard;
