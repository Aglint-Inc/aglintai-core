import JobWorkflowDashboard from '@/src/components/JobWorkflows';
import { ApplicationsProvider } from '@/src/context/ApplicationsContext';
import { JobProvider } from '@/src/context/JobContext';
import JobDashboardProvider from '@/src/context/JobDashboard';
import JobInterviewPlanProvider from '@/src/context/JobInterviewPlanContext';

const JobWorkflowsPage = () => {
  return <JobWorkflowDashboard />;
};

export default JobWorkflowsPage;

JobWorkflowsPage.privateProvider = (page) => {
  return (
    <JobProvider>
      <JobDashboardProvider>
        <JobInterviewPlanProvider>
          <ApplicationsProvider>{page}</ApplicationsProvider>
        </JobInterviewPlanProvider>
      </JobDashboardProvider>
    </JobProvider>
  );
};
