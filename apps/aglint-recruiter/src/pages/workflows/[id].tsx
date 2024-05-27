import Workflow from '@/src/components/Workflow/[id]';

const WorkflowPage = () => {
  return <Workflow />;
};

export default WorkflowPage;

WorkflowPage.privateProvider = (page) => {
  return <>{page}</>;
};
