import Workflow from '@/src/components/Workflow/[id]';
import WorkflowProvider from '@/src/context/Workflows/[id]';

const WorkflowPage = () => {
  return <Workflow />;
};

export default WorkflowPage;

WorkflowPage.privateProvider = (page) => {
  return <WorkflowProvider>{page}</WorkflowProvider>;
};
