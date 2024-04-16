import Seo from '@/src/components/Common/Seo';
import JobNewInterviewPlanDashboard from '@/src/components/JobNewInterviewPlan';
import JobApplicationProvider from '@/src/context/JobApplicationsContext';
import JobDashboardProvider from '@/src/context/JobDashboard';
import JobInterviewPlanProvider from '@/src/context/JobInterviewPlanContext';

const InterviewPlanJobPage = () => {
  return (
    <>
      <Seo title={`Jobs`} description='AI for People Products' />
      <JobNewInterviewPlanDashboard />
    </>
  );
};
InterviewPlanJobPage.privateProvider = function privateProvider(page) {
  return (
    <JobDashboardProvider>
      <JobApplicationProvider>
        <JobInterviewPlanProvider>{page}</JobInterviewPlanProvider>
      </JobApplicationProvider>
    </JobDashboardProvider>
  );
};

export default InterviewPlanJobPage;
