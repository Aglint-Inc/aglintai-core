import Seo from '@/src/components/Common/Seo';
import JobNewInterviewPlanDashboard from '@/src/components/Jobs/Job/Interview-Plan';
import { JobProvider } from '@/src/context/JobContext';
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
      <JobInterviewPlanProvider>{page}</JobInterviewPlanProvider>
    </JobProvider>
  );
};

export default InterviewPlanJobPage;
