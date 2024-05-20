import { PageLayout } from '@/devlink2/PageLayout';

import Filters from './Filters';
import ScheduleList from './ScheduleList';
import { ScheduleStatesProvider } from './ScheduleStatesContext';

function Schedules() {
  return (
    <ScheduleStatesProvider>
      <PageLayout slotTopbarLeft={<Filters />} slotBody={<ScheduleList />} />
    </ScheduleStatesProvider>
  );
}

export default Schedules;
