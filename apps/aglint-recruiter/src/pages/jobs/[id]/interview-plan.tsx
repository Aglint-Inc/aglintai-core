import Seo from '@/src/components/Common/Seo';
import JobNewInterviewPlanDashboard from '@/src/components/JobNewInterviewPlan';
import { ApplicationProvider } from '@/src/context/ApplicationsContext';
import { JobProvider } from '@/src/context/JobContext';
import JobDashboardProvider from '@/src/context/JobDashboard';
import JobInterviewPlanProvider from '@/src/context/JobInterviewPlanContext';

const InterviewPlanJobPage = () => {
  return (
    <>
      <Seo
        title={`Interview Plan - Job | Aglint AI`}
        description='AI for People Products'
      />
      <JobNewInterviewPlanDashboard />
    </>
  );
};
InterviewPlanJobPage.privateProvider = function privateProvider(page) {
  return (
    <JobProvider>
      <JobDashboardProvider>
        <JobInterviewPlanProvider>
          <ApplicationProvider>{page}</ApplicationProvider>
        </JobInterviewPlanProvider>
      </JobDashboardProvider>
    </JobProvider>
  );
};

export default InterviewPlanJobPage;
