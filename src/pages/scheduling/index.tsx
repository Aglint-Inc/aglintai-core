import Seo from '@/src/components/Common/Seo';
import SchedulingMainComp from '@/src/components/Scheduling';
import { InterviewerContextProvider } from '@/src/context/InterviewerContext/InterviewerContext';
import SchedulingProvider from '@/src/context/SchedulingMain/SchedulingMainProvider';

function SchedulingMainPage() {
  return (
    <>
      <Seo
        title={`Scheduling`}
        description='AI Powered Talent Development Platform.'
      />
      <SchedulingMainComp />
    </>
  );
}

SchedulingMainPage.privateProvider = function privateProvider(page) {
  return (
    <SchedulingProvider>
      <InterviewerContextProvider>{page}</InterviewerContextProvider>
    </SchedulingProvider>
  );
};

export default SchedulingMainPage;
