import Workflow from '@/src/components/Workflow/index';

const WorkflowsPage = () => {
  return <Workflow />;
};

export default WorkflowsPage;

WorkflowsPage.privateProvider = (page) => {
  return <>{page}</>;
};
