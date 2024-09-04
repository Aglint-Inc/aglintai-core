import Seo from '@/components/Common/Seo';
import JobWorkflowDashboard from '@/components/Jobs/Job/Workflow';
import { JobProvider } from '@/context/JobContext';
import JobDashboardProvider from '@/context/JobDashboard';

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
