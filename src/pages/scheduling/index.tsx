import SchedulingMainComp from '@/src/components/Scheduling';
import { InterviewerContextProvider } from '@/src/context/InterviewerContext/InterviewerContext';
import SchedulingProvider from '@/src/context/SchedulingMain/SchedulingMainProvider';

function SchedulingMainPage() {
  return (
    <>
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
