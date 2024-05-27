import Workflows from '@/src/components/Workflow/index';

const WorkflowsPage = () => {
  return <Workflows />;
};

export default WorkflowsPage;

WorkflowsPage.privateProvider = (page) => {
  return <>{page}</>;
};
