import Workflow from '@/src/components/Workflow/index';

const WorkflowPage = () => {
  return <Workflow />;
};

export default WorkflowPage;

WorkflowPage.privateProvider = (page) => {
  return <>{page}</>;
};
