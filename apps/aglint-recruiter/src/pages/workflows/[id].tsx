import Workflow from '@/src/components/Workflow/[id]';
import WorkflowsProvider from '@/src/context/Workflows';
import WorkflowProvider from '@/src/context/Workflows/[id]';

const WorkflowPage = () => {
  return <Workflow />;
};

export default WorkflowPage;

WorkflowPage.privateProvider = (page) => {
  return (
    <WorkflowsProvider>
      <WorkflowProvider>{page}</WorkflowProvider>
    </WorkflowsProvider>
  );
};
