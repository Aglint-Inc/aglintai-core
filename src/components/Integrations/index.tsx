import { Integration } from '@/devlink2';

import HrTools from './HrTools';
import Scheduling from './SchedulingTools';

function Integrations() {
  return (
    <>
      <Integration slotHrTools={<HrTools />} slotScheduling={<Scheduling />} />
    </>
  );
}

export default Integrations;
