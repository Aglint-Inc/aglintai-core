import Filters from './Filters';
import ScheduleList from './ScheduleList';
import { ScheduleStatesProvider } from './ScheduleStatesContext';

function Schedules() {
  return (
    <ScheduleStatesProvider>
      <Filters />
      <ScheduleList />
    </ScheduleStatesProvider>
  );
}

export default Schedules;
