import { WorkflowLanding } from '@/devlink3/WorkflowLanding';

import Content from './content';
import Filters from './filters';

const Body = () => {
  return (
    <WorkflowLanding
      slotSearchAndFilter={<Filters />}
      slotWorkflowCard={<Content />}
    />
  );
};

export default Body;
