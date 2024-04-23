import { Integration } from '@/devlink2';

import ATSTools from './ATSTools';
import MessagingTools from './MessagingTools';
import Scheduling from './SchedulingTools';

function Integrations() {
  return (
    <>
      <Integration
        slotHrTools={<ATSTools />}
        slotScheduling={<Scheduling />}
        slotMessaging={<MessagingTools />}
      />
    </>
  );
}

export default Integrations;
