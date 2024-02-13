import Panels from '@/src/components/Scheduling/Panels';
import InterviewPanelProvider from '@/src/context/InterviewPanel/InterviewPanelProvider';

function PanelPage() {
  return (
    <>
      <Panels />
    </>
  );
}

PanelPage.getProvider = function getProvider(page) {
  return <InterviewPanelProvider>{page}</InterviewPanelProvider>;
};

export default PanelPage;
