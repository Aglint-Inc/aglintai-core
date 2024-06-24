import JobWorkflowDashboard from '@/src/components/Jobs/Job/Workflow';
import { JobProvider } from '@/src/context/JobContext';
import JobDashboardProvider from '@/src/context/JobDashboard';

const JobWorkflowsPage = () => {
  return <JobWorkflowDashboard />;
};

export default JobWorkflowsPage;

JobWorkflowsPage.privateProvider = (page) => {
  return (
    <JobProvider>
      <JobDashboardProvider>{page}</JobDashboardProvider>
    </JobProvider>
  );
};
