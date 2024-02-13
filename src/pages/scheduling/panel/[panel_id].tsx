import Availability from '@/src/components/Scheduling/Availability/Availability';
import InterviewPanelProvider from '@/src/context/InterviewPanel/InterviewPanelProvider';

const PanelAvailability = () => {
  return (
    <>
      <Availability />
    </>
  );
};
PanelAvailability.getProvider = function getProvider(page) {
  return <InterviewPanelProvider>{page}</InterviewPanelProvider>;
};
export default PanelAvailability;
