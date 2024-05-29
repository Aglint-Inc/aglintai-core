import { WorkflowDetail } from '@/devlink3/WorkflowDetail';
import Loader from '@/src/components/Common/Loader';
import { useWorkflow } from '@/src/context/Workflows/[id]';
import NotFoundPage from '@/src/pages/404';

import Actions from './action';
import Trigger from './trigger';

const Body = () => {
  const { workflow } = useWorkflow();
  if (workflow === null) return <Loader />;
  if (workflow === undefined) return <NotFoundPage />;
  return (
    <WorkflowDetail
      slotWorkflowItem={
        <>
          <Trigger />
          <Actions />
        </>
      }
    />
  );
};

export default Body;
