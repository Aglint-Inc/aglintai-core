import { WorkflowDetail } from '@/devlink3/WorkflowDetail';
import Loader from '@/src/components/Common/Loader';
import Seo from '@/src/components/Common/Seo';
import { useWorkflow } from '@/src/context/Workflows/[id]';
import NotFoundPage from '@/src/pages/404';

import Edit from '../edit';
import Actions from './action';
import { ActionsProvider } from './context';
import Trigger from './trigger';

const Body = () => {
  const { workflow } = useWorkflow();
  if (workflow === null) return <Loader />;
  if (workflow === undefined) return <NotFoundPage />;
  return (
    <>
      <Seo title='Workflow | Aglint AI' description='AI for People Products' />
      <WorkflowDetail
        slotWorkflowItem={
          <>
            <Edit />
            <Trigger />
            <ActionsProvider>
              <Actions />
            </ActionsProvider>
          </>
        }
      />
    </>
  );
};

export default Body;
