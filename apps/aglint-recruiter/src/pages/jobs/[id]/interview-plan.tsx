import Seo from '@/src/components/Common/Seo';
import JobNewInterviewPlanDashboard from '@/src/components/JobNewInterviewPlan';
import JobApplicationProvider from '@/src/context/JobApplicationsContext';
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
    <JobDashboardProvider>
      <JobInterviewPlanProvider>
        <JobApplicationProvider>{page}</JobApplicationProvider>
      </JobInterviewPlanProvider>
    </JobDashboardProvider>
  );
};

export default InterviewPlanJobPage;
