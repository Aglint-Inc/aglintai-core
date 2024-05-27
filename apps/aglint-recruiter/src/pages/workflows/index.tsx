import Workflows from '@/src/components/Workflow/index';
import WorkflowProvider from '@/src/context/Workflow';

const WorkflowsPage = () => {
  return <Workflows />;
};

export default WorkflowsPage;

WorkflowsPage.privateProvider = (page) => {
  return <WorkflowProvider>{page}</WorkflowProvider>;
};
