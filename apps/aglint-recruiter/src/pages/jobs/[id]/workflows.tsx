import Seo from '@/src/components/Common/Seo';
import JobWorkflowDashboard from '@/src/components/Jobs/Job/Workflow';
import { JobProvider } from '@/src/context/JobContext';
import JobDashboardProvider from '@/src/context/JobDashboard';

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
