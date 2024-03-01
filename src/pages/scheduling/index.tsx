import SchedulingMainComp from '@/src/components/Scheduling';
import SchedulingProvider from '@/src/context/SchedulingMain/SchedulingMainProvider';

function SchedulingMainPage() {
  return (
    <>
      <SchedulingMainComp />
    </>
  );
}

SchedulingMainPage.getProvider = function getProvider(page) {
  return <SchedulingProvider>{page}</SchedulingProvider>;
};

export default SchedulingMainPage;
