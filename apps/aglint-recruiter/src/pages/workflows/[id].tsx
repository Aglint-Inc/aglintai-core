import Workflow from '@/components/Workflow/[id]';
import WorkflowProvider from '@/context/Workflows/[id]';

const WorkflowPage = () => {
  return <Workflow />;
};

export default WorkflowPage;

WorkflowPage.privateProvider = (page) => {
  return <WorkflowProvider>{page}</WorkflowProvider>;
};
