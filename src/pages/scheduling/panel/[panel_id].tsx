import Availability from '@/src/components/Scheduling/Availability/Availability';
import SchedulingProvider from '@/src/context/SchedulingMain/SchedulingMainProvider';

const PanelAvailability = () => {
  return (
    <>
      <Availability />
    </>
  );
};
PanelAvailability.getProvider = function getProvider(page) {
  return <SchedulingProvider>{page}</SchedulingProvider>;
};
export default PanelAvailability;
