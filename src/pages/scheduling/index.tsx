import Seo from '@/src/components/Common/Seo';
import SchedulingMainComp from '@/src/components/Scheduling';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { InterviewerContextProvider } from '@/src/context/InterviewerContext/InterviewerContext';
import SchedulingProvider from '@/src/context/SchedulingMain/SchedulingMainProvider';

function SchedulingMainPage() {
  const { recruiter } = useAuthDetails();
  return (
    <>
      <Seo
        title={`${recruiter.name} | Scheduling`}
        description='AI Powered Talent Development Platform.'
      />
      <SchedulingMainComp />
    </>
  );
}

SchedulingMainPage.getProvider = function getProvider(page) {
  return (
    <SchedulingProvider>
      <InterviewerContextProvider>{page}</InterviewerContextProvider>
    </SchedulingProvider>
  );
};

export default SchedulingMainPage;
