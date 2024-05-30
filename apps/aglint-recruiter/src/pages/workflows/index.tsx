import Workflows from '@/src/components/Workflow/index';
import WorkflowsProvider from '@/src/context/Workflows';

const WorkflowsPage = () => {
  return <Workflows />;
};

export default WorkflowsPage;

WorkflowsPage.privateProvider = (page) => {
  return <WorkflowsProvider>{page}</WorkflowsProvider>;
};
