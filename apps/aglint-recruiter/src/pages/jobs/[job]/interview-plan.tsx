import Seo from '@/components/Common/Seo';
import JobNewInterviewPlanDashboard from '@/components/Jobs/Job/Interview-Plan';
import JobInterviewPlanProvider from '@/context/JobInterviewPlanContext';
import { JobProvider } from '@/job/contexts';

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
      <JobInterviewPlanProvider>{page}</JobInterviewPlanProvider>
    </JobProvider>
  );
};

export default InterviewPlanJobPage;
