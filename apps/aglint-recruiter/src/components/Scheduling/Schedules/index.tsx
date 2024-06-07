import { FilterPageLayout } from '@/devlink2/FilterPageLayout';

import Filters from './Filters';
import ScheduleList from './ScheduleList';
import { ScheduleStatesProvider } from './ScheduleStatesContext';

function Schedules() {
  return (
    <ScheduleStatesProvider>
      <FilterPageLayout slotFilter={<Filters />} slotBody={<ScheduleList />} />
    </ScheduleStatesProvider>
  );
}

export default Schedules;
