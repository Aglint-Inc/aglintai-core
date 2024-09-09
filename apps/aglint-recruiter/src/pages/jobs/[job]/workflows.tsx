import Seo from '@/components/Common/Seo';
import JobWorkflowDashboard from '@/components/Jobs/Job/Workflow';
import JobDashboardProvider from '@/context/JobDashboard';
import { JobProvider } from '@/job/contexts';

const JobWorkflowsPage = () => {
  return <JobWorkflowDashboard />;
};

export default JobWorkflowsPage;

JobWorkflowsPage.privateProvider = (page) => {
  return (
    <>
      <Seo
        title={`Job Workflow - Job | Aglint AI`}
        description='AI for People Products'
      />
      <JobProvider>
        <JobDashboardProvider>{page}</JobDashboardProvider>
      </JobProvider>
    </>
  );
};
