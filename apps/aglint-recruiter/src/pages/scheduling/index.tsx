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

SchedulingMainPage.privateProvider = function privateProvider(page) {
  return (
    <SchedulingProvider>
      <InterviewerContextProvider>{page}</InterviewerContextProvider>
    </SchedulingProvider>
  );
};

export default SchedulingMainPage;
