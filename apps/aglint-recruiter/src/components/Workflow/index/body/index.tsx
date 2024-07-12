import { WorkflowLanding } from '@/devlink3/WorkflowLanding';
import Seo from '@/src/components/Common/Seo';

import Content from './content';
import Filters from './filters';

const Body = () => {
  return (
    <>
      <Seo title='Workflow | Aglint AI' description='AI for People Products' />
      <WorkflowLanding
        slotSearchAndFilter={<Filters />}
        slotWorkflowCard={<Content />}
      />
    </>
  );
};

export default Body;
