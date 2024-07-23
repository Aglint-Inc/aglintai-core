import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { Page404 } from '@/devlink/Page404';
import { TextWithIcon } from '@/devlink2/TextWithIcon';
import { WorkflowDetail } from '@/devlink3/WorkflowDetail';
import Loader from '@/src/components/Common/Loader';
import Seo from '@/src/components/Common/Seo';
import { useWorkflow } from '@/src/context/Workflows/[id]';
import { capitalizeAll } from '@/src/utils/text/textUtils';

import Edit from '../edit';
import Actions from './action';
import { ActionsProvider } from './context';
import Trigger from './trigger';

const Body = () => {
  const { workflow } = useWorkflow();
  if (workflow === null) return <Loader />;
  if (workflow === undefined) return <Page404 />;
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
        slotConnectedJobs={<ConnectedJobs />}
      />
    </>
  );
};

export default Body;

const ConnectedJobs = () => {
  const { workflow } = useWorkflow();
  const count = workflow?.jobs?.length ?? 0;
  if (count === 0)
    return (
      <GlobalEmptyState
        iconName={'work'}
        size={4}
        slotButton={<></>}
        textDesc={'No jobs connected'}
      />
    );
  return (workflow?.jobs ?? []).map(({ title }, i) => (
    <TextWithIcon
      key={i}
      iconName={'work'}
      fontWeight={'regular'}
      textContent={capitalizeAll(title)}
    />
  ));
};
